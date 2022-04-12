import { useColorMode } from '@chakra-ui/react';
import useLocalization from '../../hooks/use-localization';
import { Button } from '@chakra-ui/react';

const ColorModeSelect = () => {
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
		<Button onClick={toggleColorMode} colorScheme='teal' variant='outline'>
			{t('button', colorMode)}
		</Button>
	);
}

export default ColorModeSelect;
