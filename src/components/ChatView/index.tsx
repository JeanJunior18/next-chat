import { useEffect, useRef } from 'react';
import Message from './Message';

const ChatView: React.FC = () => {
	const bottomChatView = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		bottomChatView.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<div className="chat-view">
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message fromMe />
			<Message />
			<Message />
			<Message />
			<Message fromMe />
			<Message fromMe />
			<Message />
			<Message fromMe />
			<Message />

			<div ref={bottomChatView} />
		</div>
	);
};

export default ChatView;
