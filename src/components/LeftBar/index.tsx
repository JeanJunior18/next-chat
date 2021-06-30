import ChatItem from './ChatItem';

const LeftBar: React.FC = () => {
	const chats = [
		{
			id: 1,
			client: 'Cliente 1',
			timeago: 'Hoje 12:45',
			lastMessage: 'Bom dia Sr',
		},
		{
			id: 2,
			client: 'Jean Junior',
			timeago: 'Hoje 10:34',
			lastMessage: 'Negócio Fechado',
			avatar:
				'https://fastzap.s3.sa-east-1.amazonaws.com/media/avatar/myProfile.jpg',
			isActive: true,
		},
		{
			id: 3,
			client: 'Cliente 3',
			timeago: 'Hoje 15:07',
			lastMessage: 'Aguardo retorno',
		},
	];
	return (
		<div className="left-bar">
			<div className="brand">
				<img src="assets/icon-nextjs.png" alt="Next Icon" />
				<span className="name">Next Chat</span>
			</div>

			<div className="search">
				<span className="material-icons">search</span>
				<input type="text" placeholder="Pesquise por um atendimento" />
			</div>

			<div className="tabs-chat">
				<span className="tab">Ativos</span>
				<span className="tab">Aguardando</span>
			</div>
			{chats.map((chat) => (
				<ChatItem key={chat.id} {...chat} />
			))}
		</div>
	);
};

export default LeftBar;
