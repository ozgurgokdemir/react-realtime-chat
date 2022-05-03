import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import RequireAuth from '../../components/RequireAuth/RequireAuth';
import Messages from '../../pages/Messages/Messages';
import JoinChat from '../../pages/Messages/JoinChat';
import Chat from '../../pages/Chat/Chat';

const Content = () => {
  return (
    <main className='flex overflow-hidden'>
      <Routes>
        <Route element={<RequireAuth false />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth true />}>
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:chatId" element={<Chat />} />
          <Route path="/messages/join" element={<JoinChat />} />
          <Route path="/friends" />
          <Route path="/settings" />
          <Route path="/profile" />
        </Route>
      </Routes>
    </main>
  );
}

export default Content;
