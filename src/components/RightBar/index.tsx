import { useAuth } from '../../hooks/useAuth';

const RightBar: React.FC = () => {
	const { sighWithGoogle } = useAuth();

	const handleLogin = async () => {
		await sighWithGoogle();
	};
	return (
		<div className="right-bar">
			<button onClick={handleLogin}>Login Google</button>
		</div>
	);
};

export default RightBar;
