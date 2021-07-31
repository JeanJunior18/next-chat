import { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import Message from './Message';

const ChatView: React.FC = () => {
	const bottomChatView = useRef<HTMLDivElement | null>(null);
	const { currentChat } = useChat();

	const scrollToBottom = () => {
		bottomChatView.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	useEffect(() => {
		console.warn('EAI');
	}, [currentChat]);

	if (!currentChat?.messages) return <span>asd</span>;

	return (
		<div className="chat-view">
			{Object.values(currentChat?.messages).map((message) => (
				<Message key={message.key.id} user={currentChat} id={message.key.id} />
			))}

			<div ref={bottomChatView} />
		</div>
	);
};

export default ChatView;
