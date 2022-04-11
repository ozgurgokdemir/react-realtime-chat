import { useContext } from 'react';
import { LocaleContext } from '../../store/locale-context';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useLocalization from '../../hooks/use-localization';

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
    <nav className='container mx-auto flex items-center justify-center py-12 gap-6'>
      <ul className='flex items-center gap-6'>
        <li><Link to="/" className='font-medium text-lg'>{t('home')}</Link></li>
        <li><Link to="/auth" className='font-medium text-lg'>{t('signIn')}</Link></li>
      </ul>
      <LocaleSelect />
      <ThemeButton />
    </nav>
  );
}

function LocaleSelect() {
	const { language, setLanguage } = useContext(LocaleContext);

	const localeCodes = { English: 'en', Türkçe: 'tr' };

	const handleClick = (language) => setLanguage(language);

	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
				{Object.keys(localeCodes).find((key) => localeCodes[key] === language)}
			</MenuButton>
			<MenuList>
				{Object.keys(localeCodes).map((key) => (
					<MenuItem
						key={key}
						isDisabled={language === localeCodes[key]}
						onClick={handleClick.bind(null, localeCodes[key])}
					>
						{key}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

	const translations = {
		en: {
			button: (mode) => `Set to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`,
		},
		tr: {
			button: (mode) => `${mode === 'dark' ? 'Açık' : 'Koyu'} Tema'ya Geç`,
		},
	};
  const { t } = useLocalization(translations);

  return (
    <Button onClick={toggleColorMode} colorScheme='teal' variant='solid'>
      {t('button', colorMode)}
    </Button>
  );
}

export default Navigation;