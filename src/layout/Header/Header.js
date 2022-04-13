import ColorModeMenu from '../../components/ColorModeMenu/ColorModeMenu';
import LanguageMenu from '../../components/LanguageMenu/LanguageMenu';

const Header = () => {
  return (
    <header className='p-6 flex items-center justify-end border-b lg:p-8'>
      <ul className='flex gap-6'>
        <li><LanguageMenu /></li>
        <li><ColorModeMenu /></li>
      </ul>
    </header>
  );
}

export default Header;