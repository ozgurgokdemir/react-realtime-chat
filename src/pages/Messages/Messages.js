import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { loadDocs, getDoc, getDocs } from '../../services/firebase/firestore';
import { useAuth } from '../../store/auth-context';

const Messages = () => {
	const [chats, setChats] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchChatMemberIds = async (chatId) => {
			const querySnapshot = await getDocs(`chats/${chatId}/members`);
			return querySnapshot.docs.map(({ id }) => id);
		};
		const fetchUserData = async (userId) => {
			const querySnapshot = await getDoc('users', userId);
			return querySnapshot.data();
		};
		const handleSnapshot = (snapshot) => {
			const chatIds = snapshot.docs.map(({ id }) => id);
			chatIds.forEach(async (chatId) => {
				const memberIds = await fetchChatMemberIds(chatId);
				const contactId = memberIds.find((memberId) => memberId !== user.uid);
				const contactInfo = await fetchUserData(contactId);
				const contact = { uid: contactId, name: contactInfo.name };
				setChats([{ id: chatId, contact }]);
			});
		};
		loadDocs(`users/${user.uid}/chats`, null, handleSnapshot);
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
