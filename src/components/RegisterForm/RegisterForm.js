import { useState, Fragment } from 'react';
import { Button, Link } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

import CreateAccount from './CreateAccount';
import CreateProfile from './CreateProfile';

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
		{
			title: 'Create your Account',
			controls: <CreateAccount register={register} errors={errors} />,
		},
		{
			title: 'Create your Profile',
			controls: <CreateProfile register={register} errors={errors} />,
		},
	];

	const handleFormSubmit = (stepData) => {
		setData((prev) => ({ ...prev, ...stepData }));
		if (step !== steps.length - 1) return setStep((s) => s + 1);
		return new Promise((resolve) => onSubmit({ data, ...stepData }, resolve));
	};

	return (
		<Fragment>
			<h1 className='text-3xl font-bold'>{steps[step].title}</h1>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(handleFormSubmit)}
				noValidate
			>
				{steps[step].controls}
				<div className='grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-4'>
					{step !== 0 ? (
						<Button type='button' onClick={setStep.bind(null, (s) => s - 1)}>
							Back
						</Button>
					) : (
						<Link as={RouterLink} to='/login' className='w-fit my-auto'>
							Sign-in instead
						</Link>
					)}
					<Button
						type='submit'
						colorScheme='blue'
						isLoading={step === steps.length - 1 && isSubmitting}
						loadingText='Creating Account...'
					>
						{step === steps.length - 1 ? 'Create Account' : 'Next'}
					</Button>
				</div>
			</form>
		</Fragment>
	);
};

export default RegisterForm;
