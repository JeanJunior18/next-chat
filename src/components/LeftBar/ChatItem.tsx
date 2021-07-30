export interface ChatItem {
	client: string;
	avatar?: string;
	name: string;
	jid: string;
	lastMessage?: string;
	timeago?: string;
	isActive?: boolean;
}

const ChatItem: React.FC<ChatItem> = (props) => {
	return (
		<div className={`chat-item ${(props.isActive && 'active') || ''}`}>
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
				<p className="last-message">{props.jid.replace(/[^0-9]+/g, '')}</p>
			</div>
			<span className="timeago">{props.timeago}</span>
		</div>
	);
};

export default ChatItem;
