import IconLink from '../../components/IconLink/IconLink';
import { IoChatboxEllipses } from 'react-icons/io5';
import { RiContactsFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const Navbar = () => {
  return (
    <nav className='sticky bottom-0 flex justify-between items-center border-t lg:relative lg:p-8 lg:flex-col lg:border-t-0 lg:border-r'>
      <IconLink to="/messages" icon={IoChatboxEllipses} />
      <IconLink to="/friends" icon={RiContactsFill} />
      <IconLink to="/settings" icon={IoMdSettings} />
      <IconLink to="/profile" icon={FaUserCircle} />
    </nav>
  );
}

export default Navbar;
