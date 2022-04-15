// import useLocalization from '../../hooks/use-localization';
import MediaQuery from '../../components/MediaQuery/MediaQuery';
import IconLink from '../../components/IconLink/IconLink';
import { IoChatboxEllipses } from 'react-icons/io5';

const Navigation = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center gap-6 border-t lg:relative lg:p-8 lg:flex-col lg:border-t-0 lg:border-r'>
      <MediaQuery min='sm' max='lg'>
        <IconLink to="/" icon={IoChatboxEllipses} />
        <IconLink to="/friends" icon={IoChatboxEllipses} />
      </MediaQuery>
      <MediaQuery min='lg'>
        <IconLink to="/sessions" icon={IoChatboxEllipses} />
        <IconLink to="/auth" icon={IoChatboxEllipses} />
      </MediaQuery>
    </nav>
  );
}

export default Navigation;
