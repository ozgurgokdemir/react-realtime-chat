import { Stack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});

const AuthForm = ({ onSubmit, buttonText }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const handleFormSubmit = ({email, password}) => onSubmit(email, password);
  
	return (
		<form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
			<Stack direction='column'>
				<FormControl isRequired>
					<FormLabel htmlFor='email'>E-mail</FormLabel>
					<Input type='email' id='email' {...register('email', { required: true })} />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input type='password' id='password' {...register('password', { required: true })} />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='confirmPassword'>Password</FormLabel>
					<Input type='password' id='confirmPassword' {...register('confirmPassword', { required: true })} />
          {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
				</FormControl>
			</Stack>
			<Button type='submit'>{buttonText}</Button>
		</form>
	);
};

export default AuthForm;
