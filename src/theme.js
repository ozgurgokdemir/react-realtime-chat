import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: true,
};

const colors = {
	light: 'hsl(0deg 0% 100%)',
	dark: 'hsl(220deg 50% 10%)',
	accent: 'hsl(170deg 70% 70%)',
};

const styles = {
	global: (props) => ({
		body: {
			color: mode(colors.dark, colors.light)(props),
			background: mode(colors.light, colors.dark)(props),
		},
	}),
};

const theme = extendTheme({ config, styles });

export default theme;
