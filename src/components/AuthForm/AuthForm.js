import { Stack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const AuthForm = ({ buttonText }) => {
	return (
		<form className='w-full flex flex-col gap-4'>
			<Stack direction='column'>
				<FormControl isRequired>
					<FormLabel htmlFor='email'>E-mail</FormLabel>
					<Input type='email' id='email' />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input type='password' id='password' />
				</FormControl>
			</Stack>
			<Button type='submit'>{buttonText}</Button>
		</form>
	);
};

export default AuthForm;
