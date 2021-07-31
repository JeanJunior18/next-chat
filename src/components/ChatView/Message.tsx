import { ChatProps } from '../../context/chatContext';
import ImageMessage from './ImageMessage';

export interface MessageProps {
	message?: string;
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

interface MessageComponentProps {
	user: ChatProps;
	id: string;
}

const Message: React.FC<MessageComponentProps> = ({ user, id }) => {
	const viewMessage = (msg: Record<string, any>) => {
		try {
			const [[typeMessage, data]] = Object.entries(msg.message);
			if (typeMessage === 'conversation') return data;
			if (typeMessage === 'extendedTextMessage') return data;
			if (typeMessage === 'imageMessage') return <ImageMessage {...msg} />;
			if (typeMessage === 'stickerMessage') return <ImageMessage {...msg} />;
			if (typeMessage === 'extendedTextMessage') return data;
			return JSON.stringify(msg);
		} catch (e) {
			console.log(e);
			return JSON.stringify(msg);
		}
	};

	if (!user) return <div>Nulll</div>;

	return (
		<div className={`message ${user.key?.fromMe ? 'from-me' : ''}`}>
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
