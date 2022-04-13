import { Link } from 'react-router-dom';
import useLocalization from '../../hooks/use-localization';
import MediaQuery from '../../components/MediaQuery/MediaQuery';

const Navigation = () => {
  const translations = {
    en: {
      home: 'Home',
      signIn: 'Sign-in',
    },
    tr: {
      home: 'Ana Sayfa',
      signIn: 'Giriş Yap',
    }
  }
  const { t } = useLocalization(translations);

  return (
    <nav className='fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center gap-6 border-t lg:relative lg:p-8 lg:flex-col lg:border-t-0 lg:border-r'>
      <MediaQuery min='sm' max='lg'>
        <Link to="/" className='flex mb-auto font-medium text-lg'>{t('home')}</Link>
        <Link to="/friends" className='font-medium text-lg'>Friends</Link>
      </MediaQuery>
      <MediaQuery min='lg'>
        <Link to="/sessions" className='font-medium text-lg'>Sessions</Link>
        <Link to="/auth" className='flex mt-auto font-medium text-lg'>{t('signIn')}</Link>
      </MediaQuery>
    </nav>
  );
}

export default Navigation;
