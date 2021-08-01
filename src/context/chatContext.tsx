import { createContext, ReactNode, useEffect, useState } from 'react';
import { MessageProps } from '../components/ChatView/Message';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { database } from '../services/firebase';

export interface ChatProps {
	avatar: string;
	jid: string;
	name?: string;
	t: string;
	messages: Record<string, MessageProps>;
	user: {
		avatar?: string;
		token: string;
		username: string;
	};
}

type ChatContext = {
	chats: ChatProps[];
	currentChat?: ChatProps;
	selectChat: (jid: string) => void;
	connection?: {
		qrCodeUrl: string;
		isPhoneConnected: boolean;
	};
};

type ChatContextProvider = {
	children: ReactNode;
};

export const ChatContext = createContext({} as ChatContext);

export function ChatContextProvider({ children }: ChatContextProvider) {
	const { user } = useAuth();
	const [chats, setChats] = useState<ChatProps[]>([]);
	const [currentChat, setCurrentChat] = useState<ChatProps | undefined>();
	const [connection, setConnection] = useState();

	useEffect(() => {
		if (!user?.id) return;

		const userRef = database.ref(`wpprodev/tokens/${user.id}/status`);
		const chatsRef = database.ref(`wpprodev/tokens/${user.id}/chats`);

		userRef.on('value', (snapshot) => {
			console.log(snapshot.val());
			setConnection(snapshot.val());
		});

		chatsRef.on('value', (snapshot) => {
			if (!snapshot.val()) return createToken();
			const listChats: ChatProps[] = Object.values(snapshot.val());
			setChats(listChats);
		});
	}, [user?.id]);

	const createToken = () => {
		if (!user) return;
		api()
			.post('/api/v2/user', {
				token: user.id,
				username: user.name,
				avatar: user.avatar,
			})
			.catch((err) => {
				console.error(err.response?.data?.error || err.message);
			});
	};

	const selectChat = (jid: string) => {
		const chat = chats.find((c) => c.jid === jid);
		setCurrentChat(chat);
	};
	return (
		<ChatContext.Provider
			value={{ chats, selectChat, currentChat, connection }}
		>
			{children}
		</ChatContext.Provider>
	);
}
