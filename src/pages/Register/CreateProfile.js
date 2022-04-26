import { Fragment } from 'react';
import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const FILE_SIZE = 1000 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object().shape({
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
	displayName: yup
		.string()
		.required('Name is required')
		.min(5, 'Name must be atleast 5 characters'),
});

const CreateProfile = ({ onAction }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleBackButton = () => onAction({ type: 'BACK' });
	const handleFormSubmit = (data) =>
		new Promise((resolve) => onAction({ type: 'SUBMIT', data }, resolve));

	return (
		<Fragment>
			<h1 className='text-3xl font-bold'>Create your Profile</h1>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(handleFormSubmit)}
				noValidate
			>
				<Stack direction='column'>
					<FormControl isInvalid={errors.photo}>
						<FormLabel htmlFor='photo'>Profile Photo</FormLabel>
						<Input
							type='file'
							accept={SUPPORTED_FORMATS.join(',')}
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
					<FormControl isInvalid={errors.displayName}>
						<FormLabel htmlFor='displayName'>Name</FormLabel>
						<Input type='text' id='displayName' {...register('displayName')} />
						{errors.displayName && (
							<FormErrorMessage className='text-red-500'>
								{errors.displayName.message}
							</FormErrorMessage>
						)}
					</FormControl>
				</Stack>
				<div className='grid grid-cols-2 gap-4'>
					<Button type='button' onClick={handleBackButton}>
						Back
					</Button>
					<Button
						type='submit'
						colorScheme='blue'
						isLoading={isSubmitting}
						loadingText='Creating Account...'
					>
						Create Account
					</Button>
				</div>
			</form>
		</Fragment>
	);
};

export default CreateProfile;
