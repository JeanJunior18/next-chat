import { useChat } from '../../hooks/useChat';

export interface ChatItem {
	avatar?: string;
	name?: string;
	jid: string;
	t: string;
	isActive?: boolean;
}

const ChatItem: React.FC<ChatItem> = (props) => {
	const { selectChat } = useChat();
	return (
		<div
			className={`chat-item ${(props.isActive && 'active') || ''}`}
			onClick={() => {
				selectChat(props.jid);
			}}
		>
			<img
				src={
					props.avatar ||
					'https://fastzap.s3.sa-east-1.amazonaws.com/media/avatar/default_avatar.jpg'
				}
				alt=""
				className="avatar"
			/>
			<div className="info">
				<span className="client">{props.name}</span>
				<p className="last-message">{props.jid?.replace(/[^0-9]+/g, '')}</p>
			</div>
			<span className="timeago">{props.t}</span>
		</div>
	);
};

export default ChatItem;
