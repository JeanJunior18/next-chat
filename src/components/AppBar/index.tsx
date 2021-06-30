const AppBar: React.FC = () => {
	return (
		<div className="app-bar">
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
