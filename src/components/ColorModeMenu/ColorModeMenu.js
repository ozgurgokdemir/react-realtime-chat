import { useEffect } from 'react';
import useColorMode from '../../hooks/use-color-mode';
import useLocalization from '../../hooks/use-localization';
import { Menu, MenuButton, IconButton , MenuList, MenuItem } from '@chakra-ui/react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { CgScreen } from 'react-icons/cg';

const ColorModeMenu = () => {
	const translations = {
		en: {
			light: 'Light',
			dark: 'Dark',
			system: 'System',
		},
		tr: {
      light: 'Light',
			dark: 'Dark',
			system: 'System',
		},
	};
	const { t } = useLocalization(translations);

  const { colorMode, setColorMode, COLOR_MODES } = useColorMode();
  const storedColorMode = localStorage.getItem('color-mode');

  useEffect(() => {
    if (!storedColorMode) setColorMode('system');
  }, [storedColorMode, setColorMode]);

	return (
		<Menu autoSelect={false} gutter='12'>
			<MenuButton as={IconButton} icon={(colorMode ?? storedColorMode) === 'light' ? <IoSunny />  : <IoMoon />} isRound={true} />
			<MenuList minWidth='fit-content'>
				{COLOR_MODES.map((key) => (
					<MenuItem
						key={key}
            icon={
              key === 'system'
              ? <CgScreen /> 
              : key === 'light'
              ? <IoSunny /> 
              : <IoMoon />
            }
						isDisabled={(colorMode ?? storedColorMode) === key}
            fontWeight='medium'
						onClick={setColorMode.bind(null, key)}
					>
						{t(key)}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default ColorModeMenu;
