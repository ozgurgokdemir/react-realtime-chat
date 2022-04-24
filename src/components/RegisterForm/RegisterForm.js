import { useState } from 'react';
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

const accountSchema = yup.object().shape({
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

const FILE_SIZE = 1000 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const profileSchema = yup.object().shape({
	photo: yup
		.mixed()
		.test('fileSize', 'Profile photo is required', (value) => value.length > 0)
		.test(
			'fileSize',
			`File size is too large (max: ${FILE_SIZE / 1024000}MB)`,
			([value]) => value?.size <= FILE_SIZE
		)
		.test('fileFormat', 'Unsupported file format', ([value]) =>
			SUPPORTED_FORMATS.includes(value?.type)
		),
	name: yup
		.string()
		.required('Name is required')
		.min(5, 'Name must be atleast 5 characters'),
});

const CreateAccount = ({ register, errors }) => {
	return (
		<Stack direction='column'>
			<FormControl isInvalid={errors.email}>
				<FormLabel htmlFor='email'>E-mail</FormLabel>
				<Input type='email' id='email' {...register('email')} />
				{errors.email && (
					<FormErrorMessage className='text-red-500'>
						{errors.email.message}
					</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={errors.password}>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<Input type='password' id='password' {...register('password')} />
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
					{...register('confirmPassword')}
				/>
				{errors.confirmPassword && (
					<FormErrorMessage className='text-red-500'>
						{errors.confirmPassword.message}
					</FormErrorMessage>
				)}
			</FormControl>
		</Stack>
	);
};

const CreateProfile = ({ register, errors }) => {
	return (
		<Stack direction='column'>
			<FormControl isInvalid={errors.photo} isRequired>
				<FormLabel htmlFor='photo'>Profile Photo</FormLabel>
				<Input
					type='file'
					accept='image/*'
					id='photo'
					variant='flushed'
					{...register('photo')}
				/>
				{errors.photo && (
					<FormErrorMessage className='text-red-500'>
						{errors.photo.message}
					</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={errors.name} isRequired>
				<FormLabel htmlFor='name'>Name</FormLabel>
				<Input type='name' id='name' {...register('name')} />
				{errors.name && (
					<FormErrorMessage className='text-red-500'>
						{errors.name.message}
					</FormErrorMessage>
				)}
			</FormControl>
		</Stack>
	);
};

const FormActions = ({ children }) => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4'>
			{children}
		</div>
	);
};

const RegisterForm = ({ onSubmit }) => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState({
		email: '',
		password: '',
		photo: '',
		name: '',
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(step === 0 ? accountSchema : profileSchema),
	});

	const steps = [
		<CreateAccount register={register} errors={errors} />,
		<CreateProfile register={register} errors={errors} />,
	];

	const handleFormSubmit = (stepData) => {
		setData((prev) => ({ ...prev, ...stepData }));
		if (step !== steps.length - 1) return setStep((s) => s + 1);
		return new Promise((resolve) => onSubmit({ data, ...stepData }, resolve));
	};

	return (
		<form
			className='w-full flex flex-col gap-4'
			onSubmit={handleSubmit(handleFormSubmit)}
			noValidate
		>
			{steps[step]}
			<FormActions>
				{step !== 0 && (
					<Button type='button' onClick={setStep.bind(null, (s) => s - 1)}>
						Back
					</Button>
				)}
				<Button
					type='submit'
					colorScheme='blue'
					isLoading={step === steps.length - 1 && isSubmitting}
					loadingText='Creating Account...'
				>
					{step === steps.length - 1 ? 'Create Account' : 'Next'}
				</Button>
			</FormActions>
		</form>
	);
};

export default RegisterForm;
