import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';

const Settings: React.FC = () => {
	const { user } = useAuth();
	const { connection } = useChat();
	return (
		<div>
			<h2>Configurações</h2>
			{JSON.stringify(user)}
			{JSON.stringify(connection)}
			<img src={connection?.qrCodeUrl} alt="" />
		</div>
	);
};

export default Settings;
