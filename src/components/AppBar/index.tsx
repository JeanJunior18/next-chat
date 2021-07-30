import { useAuth } from '../../hooks/useAuth';

const AppBar: React.FC = () => {
	const { user } = useAuth();
	return (
		<div className="app-bar">
			<div className="brand">
				<img src={user?.avatar || 'assets/icon-nextjs.png'} alt="Next Icon" />
				<span className="name">{user?.name || 'Next Chat'}</span>
			</div>
			<div className="client">
				<img
					className="avatar"
					src="https://avatars.githubusercontent.com/u/54405723?v=4"
					alt="Client Avatar"
				/>

				<div className="info">
					<span className="name">Jean Junior</span>
					<span className="caption">+55 (86) 9916-7437</span>
				</div>
			</div>
		</div>
	);
};

export default AppBar;
