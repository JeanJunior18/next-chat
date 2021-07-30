import LeftBar from '../components/LeftBar';
import ChatView from '../components/ChatView';
import RightBar from '../components/RightBar';
import Login from '../components/Login';
import { useAuth } from '../hooks/useAuth';

export default function Home(): React.ReactElement {
	const { user } = useAuth();
	return (
		<div className="app-area chat">
			<LeftBar />
			<ChatView />
			<RightBar />

			{!user && <Login />}
		</div>
	);
}
