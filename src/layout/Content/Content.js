import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';

const Content = () => {
  return (
    <main className='flex overflow-hidden'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default Content;