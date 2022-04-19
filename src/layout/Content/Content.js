import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import RequireAuth from '../../components/RequireAuth/RequireAuth';
import Messages from '../../pages/Messages/Messages';

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
          <Route path="/friends" />
          <Route path="/settings" />
          <Route path="/profile" />
        </Route>
      </Routes>
    </main>
  );
}

export default Content;
