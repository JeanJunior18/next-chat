import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';

const AppBar: React.FC = () => {
	const { user } = useAuth();
	const { currentChat } = useChat();
	return (
		<div className="app-bar">
			<div className="brand">
				<img src={user?.avatar || 'assets/icon-nextjs.png'} alt="Next Icon" />
				<span className="name">{user?.name || 'Next Chat'}</span>
			</div>
			{currentChat && (
				<div className="client">
					<img
						className="avatar"
						src={currentChat.avatar || 'assets/default_avatar.jpg'}
						alt="Client Avatar"
					/>

					<div className="info">
						<span className="name">{currentChat.name}</span>
						<span className="caption">
							{currentChat.jid.replace(/[^0-9]+/g, '')}
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default AppBar;
