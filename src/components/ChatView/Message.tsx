import { ChatProps } from '../../context/chatContext';
import ImageMessage, { IImageMessage } from './ImageMessage';

export interface MessageProps {
	message?: MessageInsideProps;
	name?: string;
	avatar?: string;
	messageTimestamp: string;
	status: string;
	key: {
		id: string;
		fromMe: boolean;
		remoteJid: string;
	};
}

interface MessageInsideProps {
	imageMessage?: IImageMessage;
	conversation?: string;
	extendedTextMessage?: { text: string };
}
interface MessageComponentProps {
	user: ChatProps;
	id: string;
}

const Message: React.FC<MessageComponentProps> = ({ user, id }) => {
	const viewMessage = (msg: MessageProps) => {
		try {
			if (!msg.message) throw new Error('Invalid message');
			if (msg.message.conversation) return msg.message.conversation;
			if (msg.message.extendedTextMessage)
				return msg.message.extendedTextMessage?.text;
			if (msg.message.imageMessage) return <ImageMessage data={msg} />;
			return JSON.stringify(msg);
		} catch (e) {
			console.log(e);
			return JSON.stringify(msg);
		}
	};

	if (!user) return <div>Nulll</div>;

	return (
		<div
			className={`message ${user.messages[id]?.key.fromMe ? 'from-me' : ''}`}
		>
			<div className="user">
				<img className="avatar" src={user.avatar} />
				<span className="name">{user.name}</span>
			</div>

			<div className="content">{viewMessage(user.messages[id])}</div>
			{/* {JSON.stringify(user.messages[id])} */}

			<div className="caption">{user.messages[id].messageTimestamp}</div>
			<div className="caption">{user.messages[id].status}</div>
		</div>
	);
};

export default Message;
