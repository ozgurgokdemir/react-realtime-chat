import { useState } from 'react';
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
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { user } = useAuth();

	const navigate = useNavigate();

	const fetchUserChats = async () => {
		const userSnapshot = await getDocument('users', user.uid);
		const userData = userSnapshot.data();

		if (!userData) throw new Error('Something went wrong');
		return userData.chats;
	};
	const fetchChatMembers = async (chatId) => {
		const chatSnapshot = await getDocument('chats', chatId);
		const chatData = chatSnapshot.data();

		if (!chatData) throw new Error('Chat does not exist');
		return chatData.members;
	};

	const handleFormSubmit = async ({ chatId }) => {
		try {
			const prevChats = await fetchUserChats().catch((error) => {
				throw new Error(error.message);
			});

			if (prevChats && prevChats.includes(chatId)) {
				throw new Error('You are already in this chat');
			}

			const prevMembers = await fetchChatMembers(chatId).catch((error) => {
				throw new Error(error.message);
			});

			const chats = [...(prevChats ? prevChats : ''), chatId];
			setDocument('users', user.uid, { chats }, null, true);

			const members = [...(prevMembers ? prevMembers : ''), user.uid];
			setDocument('chats', chatId, { members }, null, true);

			navigate(`/messages/${chatId}`, { replace: true });
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center container mx-auto p-4 gap-12 text-center'>
			<form
				className='w-full flex flex-col gap-4'
				onSubmit={handleSubmit(handleFormSubmit)}
				onChange={() => !!error && setError('')}
			>
				<FormControl isInvalid={errors.chatId || !!error}>
					<FormLabel htmlFor='chatId'>Chat ID</FormLabel>
					<Input type='text' id='chatId' {...register('chatId')} />
					<FormErrorMessage className='text-red-500'>
						{errors.chatId?.message ?? error}
					</FormErrorMessage>
				</FormControl>
				<Button type='submit' colorScheme='blue'>
					Join to Chat
				</Button>
			</form>
		</div>
	);
};

export default JoinChat;
