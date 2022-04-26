import { Fragment } from 'react';
import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Link,
	Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Email must be valid')
		.required('E-mail is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Passwords must match'),
});

const CreateAccount = ({ data, onAction }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleFormSubmit = (data) => onAction({ type: 'NEXT', data });

	return (
		<Fragment>
			<h1 className='text-3xl font-bold'>Create your Account</h1>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(handleFormSubmit)}
				noValidate
			>
				<Stack direction='column'>
					<FormControl isInvalid={errors.email}>
						<FormLabel htmlFor='email'>E-mail</FormLabel>
						<Input
							type='email'
							id='email'
							defaultValue={data.email}
							{...register('email')}
						/>
						{errors.email && (
							<FormErrorMessage className='text-red-500'>
								{errors.email.message}
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.password}>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							type='password'
							id='password'
							defaultValue={data.password}
							{...register('password')}
						/>
						{errors.password && (
							<FormErrorMessage className='text-red-500'>
								{errors.password.message}
							</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={errors.confirmPassword}>
						<FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
						<Input
							type='password'
							id='confirmPassword'
							defaultValue={data.confirmPassword}
							{...register('confirmPassword')}
						/>
						{errors.confirmPassword && (
							<FormErrorMessage className='text-red-500'>
								{errors.confirmPassword.message}
							</FormErrorMessage>
						)}
					</FormControl>
				</Stack>
				<div className='grid grid-cols-2 gap-4'>
					<Link as={RouterLink} to='/login' className='w-fit my-auto'>
						Sign-in instead
					</Link>
					<Button type='submit' colorScheme='blue'>
						Next
					</Button>
				</div>
			</form>
		</Fragment>
	);
};

export default CreateAccount;
