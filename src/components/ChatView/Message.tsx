interface MessageProps {
	fromMe?: boolean;
}

const Message: React.FC<MessageProps> = ({ fromMe }) => {
	return (
		<div className={`message ${fromMe ? 'from-me' : ''}`}>
			<div className="user">
				<img
					className="avatar"
					src="https://avatars.githubusercontent.com/u/54405723?v=4"
				/>
				<span className="name">Jean Junior</span>
			</div>

			<div className="content">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ducimus
				accusantium, nihil dignissimos sint officiis delectus laborum cumque!
				Doloremque quidem modi impedit veritatis iste accusamus quam laboriosam
				minima nostrum eius.
			</div>

			<div className="caption">4m ago</div>
		</div>
	);
};

export default Message;
