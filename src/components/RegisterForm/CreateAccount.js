import { Stack, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

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

export default CreateAccount;