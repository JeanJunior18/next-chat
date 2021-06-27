import Sidebar from '../components/Sidebar';
import LeftBar from '../components/LeftBar';
import AppBar from '../components/AppBar';
import ChatView from '../components/ChatView';
import RightBar from '../components/RightBar';

export default function Home(): React.ReactElement {
	return (
		<div className="grid">
			<Sidebar />
			<LeftBar />
			<AppBar />
			<ChatView />
			<RightBar />
		</div>
	);
}
