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
			{chats.map((chat) => (
				<ChatItem key={chat.id} {...chat} />
			))}
		</div>
	);
};

export default LeftBar;
