interface MessageProps {
	fromMe?: boolean;
	message?: string;
	name?: string;
	avatar?: string;
	messageTimestamp: string;
	status: string;
}

const Message: React.FC<MessageProps> = ({
	fromMe,
	message,
	avatar,
	name,
	messageTimestamp,
	status,
	...props
}) => {
	return (
		<div className={`message ${fromMe ? 'from-me' : ''}`}>
			<div className="user">
				<img className="avatar" src={avatar} />
				<span className="name">{name}</span>
			</div>

			<div className="content">{'message'}</div>

			<div className="caption">{messageTimestamp}</div>
			<div className="caption">{status}</div>
		</div>
	);
};

export default Message;
