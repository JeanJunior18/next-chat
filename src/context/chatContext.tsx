import { createContext, ReactNode, useEffect, useState } from 'react';
import { MessageProps } from '../components/ChatView/Message';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export interface ChatProps {
	avatar: string;
	jid: string;
	name?: string;
	t: string;
	messages: Record<string, MessageProps>;
}

type ChatContext = {
	chats: ChatProps[];
	currentChat?: ChatProps;
	selectChat: (jid: string) => void;
};

type ChatContextProvider = {
	children: ReactNode;
};

export const ChatContext = createContext({} as ChatContext);

export function ChatContextProvider({ children }: ChatContextProvider) {
	const { user } = useAuth();
	const [chats, setChats] = useState<ChatProps[]>([]);
	const [currentChat, setCurrentChat] = useState<ChatProps | undefined>();

	useEffect(() => {
		if (!user?.id) return;
		console.log(user.id);
		const userRef = database.ref(`wpprodev/tokens/${'jclgjunior'}/chats`);

		userRef.on('value', (snapshot) => {
			console.log(snapshot.val());

			const listChats: ChatProps[] = Object.values(snapshot.val());
			setChats(listChats);
		});
	}, [user?.id]);

	const selectChat = (jid: string) => {
		const chat = chats.find((c) => c.jid === jid);
		setCurrentChat(chat);
	};
	return (
		<ChatContext.Provider value={{ chats, selectChat, currentChat }}>
			{children}
		</ChatContext.Provider>
	);
}
