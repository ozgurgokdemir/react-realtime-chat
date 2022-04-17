import AuthForm from '../../components/AuthForm/AuthForm';

const Login = () => {
	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
			<h1 className='text-3xl font-bold'>Continue to Chat!</h1>
			<AuthForm buttonText='Login' />
		</div>
	);
};

export default Login;
