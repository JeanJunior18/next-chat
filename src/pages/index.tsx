import LeftBar from '../components/LeftBar';
import ChatView from '../components/ChatView';
import RightBar from '../components/RightBar';

export default function Home(): React.ReactElement {
	return (
		<div className="app-area chat">
			<LeftBar />
			<ChatView />
			<RightBar />
		</div>
	);
}
