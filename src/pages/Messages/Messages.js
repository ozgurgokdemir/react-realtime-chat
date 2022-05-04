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
		const fetchChats = async (chats) => {
			if (!chats) return [];
			return Promise.all(
				chats.map(async (chatId) => {
					const memberIds = await fetchChatMemberIds(chatId);
					const contactId = memberIds.find((memberId) => memberId !== user.uid);
					const contactInfo = await fetchUserData(contactId);
					const contact = {
						uid: contactId,
						displayName: contactInfo.displayName,
						photoURL: contactInfo.photoURL,
					};
					return { id: chatId, contact };
				})
			);
		};
		const handleSnapshot = (snapshot) => {
			const userData = snapshot.data();
			fetchChats(userData.chats)
				.then((chats) => setChats(chats))
				.finally(() => setIsLoading(false));
		};
		listenDocument('users', user.uid, null, handleSnapshot);
	}, [user.uid]);

	const chatsContent = (
		<ul className='flex flex-col'>
			{chats.map(({ id, contact }) => (
				<li key={id} className='inline-block'>
					<Link to={id} className='inline-block w-full px-4 py-6'>
						{contact.displayName}
					</Link>
				</li>
			))}
		</ul>
	);
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
			{chats.length > 0 ? chatsContent : !isLoading && joinChatContent}
		</div>
	);
};

export default Messages;
