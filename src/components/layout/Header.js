import ColorModeSelect from '../settings/ColorModeSelect';
import LanguageSelect from '../settings/LanguageSelect';

const Header = () => {
  return (
    <header className='p-6 flex items-center justify-end border-b lg:p-8'>
      <ul className='flex gap-6'>
        <li><LanguageSelect /></li>
        <li><ColorModeSelect /></li>
      </ul>
    </header>
  );
}

export default Header;