import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
	const { sighWithGoogle } = useAuth();

	return (
		<div className="login">
			<div className="card-login">
				<h1>Entrar</h1>

				<div className="login-button" onClick={sighWithGoogle}>
					<img src="/assets/google-icon.svg" alt="" />
					Entrar com Google
				</div>
			</div>
		</div>
	);
};

export default Login;
