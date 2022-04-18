import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import Messages from '../../pages/Messages/Messages';

const Content = () => {
  return (
    <main className='flex overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/friends" />
        <Route path="/settings" />
        <Route path="/profile" />
      </Routes>
    </main>
  );
}

export default Content;