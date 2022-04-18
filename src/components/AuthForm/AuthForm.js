import { useRef } from 'react';
import { Stack, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const AuthForm = ({ onSubmit, buttonText }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    onSubmit(email, password);
  }
  
	return (
		<form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
			<Stack direction='column'>
				<FormControl isRequired>
					<FormLabel htmlFor='email'>E-mail</FormLabel>
					<Input type='email' id='email' ref={emailInputRef} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input type='password' id='password' ref={passwordInputRef} />
				</FormControl>
			</Stack>
			<Button type='submit'>{buttonText}</Button>
		</form>
	);
};

export default AuthForm;
