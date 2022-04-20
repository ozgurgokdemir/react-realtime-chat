import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { addDoc, loadDocs } from '../../services/firebase/firestore';
import { useAuth } from '../../store/auth-context';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();
  const messageInputRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    loadDocs(`messages/${chatId}/messages`, 'asc', 10, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(messages);
    });
  }, [chatId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = { 
      text: messageInputRef.current.value,
      by: user.uid,
    };
    addDoc(`messages/${chatId}/messages`, message);
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col'>
        {messages.map(({by, text, id}) => (
          <p className={`px-4 py-6 ${user.uid === by && 'ml-auto'}`} key={id}>{text}</p>
        ))}
      </div>
      <form className='flex w-full mt-auto' onSubmit={handleSubmit}>
        <input className='flex-1 text-black' type='text' ref={messageInputRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default Chat;
