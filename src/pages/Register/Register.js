import AuthForm from '../../components/AuthForm/AuthForm';

const Register = () => {
	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
			<h1 className='text-3xl font-bold'>Register with E-mail</h1>
			<AuthForm buttonText='Register' />
		</div>
	);
};

export default Register;
