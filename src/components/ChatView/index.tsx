import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { api } from '../../services/api';
import Message from './Message';

const ChatView: React.FC = () => {
	const bottomChatView = useRef<HTMLDivElement | null>(null);
	const { currentChat } = useChat();
	const [message, setMessage] = useState('');
	const { user } = useAuth();

	const scrollToBottom = () => {
		bottomChatView.current?.scrollIntoView({});
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentChat]);

	const sendMessage = () => {
		if (!message.trim()) return;
		api()
			.post('/api/v1/app/send-message', {
				token: user?.id,
				type: 'conversation',
				number: currentChat?.jid.replace(/@.*/, ''),
				message: message.trim(),
			})
			.catch((err) => console.error(err.response?.data?.error || err.message))
			.finally(() => setMessage(''));
	};

	if (!currentChat?.messages) return <span>asd</span>;

	return (
		<div className="chat-view">
			<div className="list-messages">
				{Object.values(currentChat?.messages)
					.reverse()
					.map((message) => (
						<Message
							key={message.key.id}
							user={currentChat}
							id={message.key.id}
						/>
					))}
				<div ref={bottomChatView} />
			</div>

			<div className="input-area">
				<textarea
					placeholder="Digite uma mensagem"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => {
						e.key === 'Enter' && !e.shiftKey && sendMessage();
					}}
				></textarea>

				<div className="send-button" onClick={sendMessage}>
					<span className="material-icons">send</span>
				</div>
			</div>
		</div>
	);
};

export default ChatView;
