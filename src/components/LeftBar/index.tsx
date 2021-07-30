import { useEffect, useState } from 'react';
import { database } from '../../services/firebase';
import ChatItem from './ChatItem';

const LeftBar: React.FC = () => {
	const [chats, setChats] = useState([]);

	useEffect(() => {
		database.ref('wpprodev/tokens/jclgjunior/chats').on('value', (snapshot) => {
			const chatsList = Object.values(snapshot.val());
			console.log(chatsList);
			setChats(chatsList);
		});
	}, []);

	return (
		<div className="left-bar">
			<div className="search">
				<span className="material-icons">search</span>
				<input type="text" placeholder="Pesquise por um atendimento" />
			</div>

			<div className="tabs-chat">
				<span className="tab">Ativos</span>
				<span className="tab">Aguardando</span>
			</div>
			<div className="chat-list">
				{chats.map((chat) => (
					<ChatItem key={chat.jid} {...chat} />
				))}
			</div>
		</div>
	);
};

export default LeftBar;
