import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { loadDocs } from '../../services/firebase/firestore';
import { useAuth } from '../../store/auth-context';

const Messages = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

	useEffect(() => {
    loadDocs(`users/${user.uid}/chats`, 'desc', 10, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log(data)
      setChats(data);
    });
  }, [user.uid]);

	return (
    <div className='w-full flex flex-col'>
      {chats.map(({id}) => (
        <Link to={id} key={id} className='px-4 py-6'>{id}</Link>
      ))}
    </div>
	);
};

export default Messages;
