import { useState, useContext, useEffect } from 'react';
import { ColorModeContext } from '@chakra-ui/react';

const COLOR_MODES = ['light', 'dark', 'system'];

const useColorMode = () => {
	const defaultState = localStorage.getItem('color-mode');

	const [colorMode, setColorMode] = useState(defaultState);

	const { setColorMode: setColorScheme } = useContext(ColorModeContext);

	useEffect(() => {
		const colorScheme = colorMode !== 'system'
			? colorMode
			: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		localStorage.setItem('color-mode', colorMode);
		setColorScheme(colorScheme);
	}, [colorMode, setColorScheme]);

	return { colorMode, setColorMode, COLOR_MODES };
};

export default useColorMode;
