import {
	Stack,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
});

const LoginForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleFormSubmit = ({ email, password }) =>
		new Promise((resolve) => onSubmit(email, password, resolve));

	return (
		<form
			className='w-full flex flex-col gap-4'
			onSubmit={handleSubmit(handleFormSubmit)}
			noValidate
		>
			<Stack direction='column'>
				<FormControl isInvalid={errors.email} isRequired>
					<FormLabel htmlFor='email'>E-mail</FormLabel>
					<Input type='email' id='email' {...register('email')} />
					{errors.email && (
						<FormErrorMessage className='text-red-500'>
							{errors.email.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isInvalid={errors.password} isRequired>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input type='password' id='password' {...register('password')} />
					{errors.password && (
						<FormErrorMessage className='text-red-500'>
							{errors.password.message}
						</FormErrorMessage>
					)}
				</FormControl>
			</Stack>
			<Button
				type='submit'
				colorScheme='blue'
				isLoading={isSubmitting}
				loadingText='Login'
			>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
