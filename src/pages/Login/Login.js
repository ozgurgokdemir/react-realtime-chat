import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../services/firebase/auth';

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = (email, password) => {
		login(email, password).then(() => navigate('/messages'));
	};

	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
			<h1 className='text-3xl font-bold'>Continue to Chat!</h1>
			<LoginForm onSubmit={handleLogin} />
		</div>
	);
};

export default Login;
