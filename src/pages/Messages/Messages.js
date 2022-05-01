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
		const handleSnapshot = (snapshot) => {
			const userData = snapshot.data();
			userData.chats.forEach(async (chatId) => {
				const memberIds = await fetchChatMemberIds(chatId);
				const contactId = memberIds.find((memberId) => memberId !== user.uid);
				const contactInfo = await fetchUserData(contactId);
				const contact = { uid: contactId, name: contactInfo.name };
				setChats([{ id: chatId, contact }]);
			});
		};
		listenDocument('users', user.uid, null, handleSnapshot);
	}, [user.uid]);

	return (
		<div className='w-full flex flex-col'>
			{chats.map(({ id, contact }) => (
				<Link to={id} key={id} className='px-4 py-6'>
					{contact.name}
				</Link>
			))}
		</div>
	);
};

export default Messages;
