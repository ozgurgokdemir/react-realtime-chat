import { createContext } from 'react';
import useMediaQuery from '../hooks/use-media-query';

export const MediaContext = createContext({
	width: 0,
	media: '',
	breakpoints: {},
});

const MediaProvider = ({ breakpoints, children }) => {
	const mediaQuery = useMediaQuery(breakpoints);

	return (
		<MediaContext.Provider value={mediaQuery}>
      {children}
    </MediaContext.Provider>
	);
};

export default MediaProvider;
