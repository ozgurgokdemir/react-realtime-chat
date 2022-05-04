import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	listenDocument,
	getDocument,
	getCollection,
} from '../../services/firebase/firestore';
import { useAuth } from '../../store/auth-context';

const Messages = () => {
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchChatMemberIds = async (chatId) => {
			const querySnapshot = await getCollection(`chats/${chatId}/members`);
			return querySnapshot.docs.map(({ id }) => id);
		};
		const fetchUserData = async (userId) => {
			const querySnapshot = await getDocument('users', userId);
			return querySnapshot.data();
		};
		const handleSnapshot = async (snapshot) => {
			const userData = snapshot.data();
			userData.chats?.forEach(async (chatId) => {
				const memberIds = await fetchChatMemberIds(chatId);
				const contactId = memberIds.find((memberId) => memberId !== user.uid);
				const contactInfo = await fetchUserData(contactId);
				const contact = { uid: contactId, name: contactInfo.name };
				setChats((prev) => [...prev, { id: chatId, contact }]);
			});
      setIsLoading(false);
		};
		listenDocument('users', user.uid, null, handleSnapshot);
	}, [user.uid]);

	const chatsContent = chats.map(({ id, contact }) => (
		<Link to={id} key={id} className='px-4 py-6'>
			{contact.name}
		</Link>
	));
	const joinChatContent = (
		<div className='w-full h-full flex flex-col items-center justify-center gap-4'>
			<div className='opacity-70'>Your messages are empty.</div>
			<Link to='join' className='flex flex-col items-center hover:underline'>
				+ Join to a Chat
			</Link>
		</div>
	);

	return (
		<div className='w-full flex flex-col'>
			{chats.length > 0 && chatsContent}
			{chats.length === 0 && !isLoading && joinChatContent}
		</div>
	);
};

export default Messages;
