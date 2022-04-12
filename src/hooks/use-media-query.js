import { useState, useEffect } from 'react';

const defaultBreakpoints = {
  'xsm': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

const useMediaQuery = (breakpoints = defaultBreakpoints) => {
	const [width, setWidth] = useState(window.innerWidth);

	const handleResize = () => setWidth(window.innerWidth);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const media = getMedia(width, breakpoints);
  
	return { width, media, breakpoints };
};

function getMedia(width, breakpoints) {
	const keys = Object.keys(breakpoints);
	const media = keys.find((key, index) => {
    const nextMedia = breakpoints[keys[index + 1]];
    const isBreakpoint = width >= breakpoints[key];
    const isNextBreakpoint = width >= nextMedia;
    const isNextExist = nextMedia !== undefined;
    return isBreakpoint && (!isNextBreakpoint || !isNextExist);
  });
	return media ?? 'xsm';
}

export default useMediaQuery;
