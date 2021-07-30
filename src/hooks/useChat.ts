import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type ChatProps = {
	avatar: string;
	jid: string;
	name?: string;
	t: string;
};

export function useChat() {
	const { user } = useAuth();
	const [chats, setChats] = useState<ChatProps[]>([]);

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
	return { chats };
}
