import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../../store/auth-context';
import { getDocument, setDocument } from '../../services/firebase/firestore';

import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({ chatId: yup.string().required() });

const JoinChat = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { user } = useAuth();

  const navigate = useNavigate();

	const handleFormSubmit = async ({ chatId }) => {
		const querySnapshot = await getDocument('users', user.uid);
		const prevChats = querySnapshot.data().chats;
		if (!prevChats.includes(chatId)) {
			const chats = [...prevChats, chatId];
			setDocument('users', user.uid, { chats }, null, true);
      navigate(`/messages/${chatId}`);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12 text-center'>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<FormControl isInvalid={errors.chatId}>
					<FormLabel htmlFor='chatId'>Chat ID</FormLabel>
					<Input type='text' id='chatId' {...register('chatId')} />
					{errors.chatId && (
						<FormErrorMessage className='text-red-500'>
							{errors.chatId.message}
						</FormErrorMessage>
					)}
				</FormControl>
				<Button type='submit' colorScheme='blue'>
					Join to Chat
				</Button>
			</form>
		</div>
	);
};

export default JoinChat;
