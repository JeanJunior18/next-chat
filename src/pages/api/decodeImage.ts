// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

import * as Crypto from 'crypto';
import got, { Options, Response } from 'got';
import { Readable, Transform } from 'stream';
import HKDF from 'futoin-hkdf';

export enum MessageType {
	text = 'conversation',
	extendedText = 'extendedTextMessage',
	contact = 'contactMessage',
	contactsArray = 'contactsArrayMessage',
	groupInviteMessage = 'groupInviteMessage',
	listMessage = 'listMessage',
	buttonsMessage = 'buttonsMessage',
	location = 'locationMessage',
	liveLocation = 'liveLocationMessage',

	image = 'imageMessage',
	video = 'videoMessage',
	sticker = 'stickerMessage',
	document = 'documentMessage',
	audio = 'audioMessage',
	product = 'productMessage',
}

const HKDFInfoKeys = {
	[MessageType.image]: 'WhatsApp Image Keys',
	[MessageType.audio]: 'WhatsApp Audio Keys',
	[MessageType.video]: 'WhatsApp Video Keys',
	[MessageType.document]: 'WhatsApp Document Keys',
	[MessageType.sticker]: 'WhatsApp Image Keys',
};

export async function downloadMediaMessage(
	message: any,
	type: 'buffer' | 'stream' = 'buffer'
) {
	const mContent =
		message.message?.ephemeralMessage?.message || message.message;
	if (!mContent) throw new Error('No message present');

	const downloadMediaMessage = async () => {
		const stream = await decryptMediaMessageBuffer(mContent);
		if (type === 'buffer') {
			let buffer = Buffer.from([]);
			for await (const chunk of stream) {
				buffer = Buffer.concat([buffer, chunk]);
			}
			return buffer;
		}
		return stream;
	};

	try {
		const buff = await downloadMediaMessage();
		return buff;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function decryptMediaMessageBuffer(
	message: any
): Promise<Readable> {
	/* 
      One can infer media type from the key in the message
      it is usually written as [mediaType]Message. Eg. imageMessage, audioMessage etc.
  */
	const type = Object.keys(message)[0] as MessageType;

	let messageContent: any;
	if (message.productMessage) {
		const product = message.productMessage.product?.productImage;
		if (!product) throw new Error('product has no image');
		messageContent = product;
	} else {
		messageContent = message[type];
	}

	// download the message
	const fetched = await getGotStream(messageContent.url, {
		headers: { Origin: 'https://web.whatsapp.com' },
	});
	let remainingBytes = Buffer.from([]);
	const { cipherKey, iv } = getMediaKeys(messageContent.mediaKey, type);
	const aes = Crypto.createDecipheriv('aes-256-cbc', cipherKey, iv);

	const output = new Transform({
		transform(chunk, _, callback) {
			let data = Buffer.concat([remainingBytes, chunk]);
			const decryptLength = Math.floor(data.length / 16) * 16;
			remainingBytes = data.slice(decryptLength);
			data = data.slice(0, decryptLength);

			try {
				this.push(aes.update(data));
				callback();
			} catch (error) {
				callback(error);
			}
		},
		final(callback) {
			try {
				this.push(aes.final());
				callback();
			} catch (error) {
				callback(error);
			}
		},
	});
	return fetched.pipe(output, { end: true });
}

export const getGotStream = async (
	url: string | URL,
	options: Options & { isStream?: true } = {}
) => {
	const fetched = got.stream(url, { ...options, isStream: true });
	await new Promise((resolve, reject) => {
		fetched.once('error', reject);
		fetched.once('response', ({ statusCode: status }: Response) => {
			if (status >= 400) {
				reject(new Error('Invalid code (' + status + ') returned'));
			} else {
				resolve(undefined);
			}
		});
	});
	return fetched;
};

export function getMediaKeys(buffer, mediaType: MessageType) {
	if (typeof buffer === 'string') {
		buffer = Buffer.from(buffer.replace('data:;base64,', ''), 'base64');
	}
	// expand using HKDF to 112 bytes, also pass in the relevant app info
	const expandedMediaKey = hkdf(buffer, 112, HKDFInfoKeys[mediaType]);
	return {
		iv: expandedMediaKey.slice(0, 16),
		cipherKey: expandedMediaKey.slice(16, 48),
		macKey: expandedMediaKey.slice(48, 80),
	};
}

export function hkdf(buffer: Buffer, expandedLength: number, info = null) {
	return HKDF(buffer, expandedLength, {
		salt: Buffer.alloc(32),
		info: info,
		hash: 'SHA-256',
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'POST') {
		const buffer = await downloadMediaMessage(req.body.message).catch(
			() => null
		);
		console.log(buffer);
		res.status(200).json({ base64Image: buffer.toString('base64') });
	}
}
