import { useContext } from 'react';
import { LocaleContext } from '../../store/locale-context';
import {
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { IoLanguage } from 'react-icons/io5';
import Flags from 'country-flag-icons/react/3x2';

const LanguageMenu = () => {
	const { language, setLanguage } = useContext(LocaleContext);

	const languages = [
		{
			name: 'English',
			code: 'en',
			country: 'GB',
		},
		{
			name: 'Türkçe',
			code: 'tr',
			country: 'TR',
		},
	];

	return (
		<Menu autoSelect={false} gutter='12' placement='auto'>
			<MenuButton as={IconButton} icon={<IoLanguage />} isRound={true} />
			<MenuList minWidth='fit-content'>
				{languages.map(({ name, code, country }) => {
					const Flag = Flags[country];
					return (
						<MenuItem
							key={country}
							icon={<Flag width={24} />}
							isDisabled={language === code}
							fontWeight='medium'
							onClick={setLanguage.bind(null, code)}
						>
							{name}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
};

export default LanguageMenu;
