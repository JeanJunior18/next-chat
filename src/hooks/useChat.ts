import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

export function useChat() {
	const chat = useContext(ChatContext);
	return chat;
}
