import { useContext } from 'react';
import { LocaleContext } from '../../store/locale-context';
import { Menu, MenuButton, IconButton , MenuList, MenuItem } from '@chakra-ui/react';
import { IoLanguage } from 'react-icons/io5';

const LanguageMenu = () => {
	const { language, setLanguage } = useContext(LocaleContext);

	const localeCodes = { English: 'en', Türkçe: 'tr' };

	const handleClick = (language) => setLanguage(language);

	return (
		<Menu autoSelect={false} gutter='12'>
			<MenuButton as={IconButton} icon={<IoLanguage />} isRound={true} />
			<MenuList minWidth='fit-content'>
				{Object.keys(localeCodes).map((key) => (
					<MenuItem
						key={key}
						isDisabled={language === localeCodes[key]}
            fontWeight='medium'
						onClick={handleClick.bind(null, localeCodes[key])}
					>
						{key}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}

export default LanguageMenu;
