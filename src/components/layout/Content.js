import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Auth from '../../pages/Auth';

const Content = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default Content;