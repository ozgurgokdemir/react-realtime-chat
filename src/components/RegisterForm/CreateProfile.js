import { Stack, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

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

export default CreateProfile;