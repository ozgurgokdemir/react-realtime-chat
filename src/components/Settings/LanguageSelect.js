import { useContext } from 'react';
import { LocaleContext } from '../../store/locale-context';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LanguageSelect = () => {
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

export default LanguageSelect;
