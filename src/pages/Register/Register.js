import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { register } from '../../services/firebase/auth';

const Register = () => {
  const handleRegister = ({ email, password, photo, name }) => {
    console.log(email, password, photo, name);
    register(email, password);
  }
	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12'>
			<h1 className='text-3xl font-bold'>Register with E-mail</h1>
			<RegisterForm onSubmit={handleRegister} />
		</div>
	);
};

export default Register;
