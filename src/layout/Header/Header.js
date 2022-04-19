import { useNavigate, useLocation } from 'react-router-dom';

import { IconButton } from '@chakra-ui/react';
import { IoArrowBackOutline } from 'react-icons/io5';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = pathname.slice(1);
  const header = location[0]?.toUpperCase() + location.slice(1);
  return (
    <header className='grid grid-cols-5 items-center border-b lg:p-8'>
      <IconButton className='navbutton' height='16' variant='ghost' aria-label='go back' icon={<IoArrowBackOutline size='28' />} onClick={navigate.bind(null, -1)} />
      <h1 className='font-bold text-3xl col-start-2 col-end-[-1]'>{header}</h1>
    </header>
  );
}

export default Header;
