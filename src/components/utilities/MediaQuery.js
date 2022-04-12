import { Fragment } from 'react';
import useMediaQuery from '../../hooks/use-media-query';

const MediaQuery = ({ min, max, children }) => {
	const { width, breakpoints } = useMediaQuery();
	if (min && breakpoints[min] > width) return;
  if (max && breakpoints[max] <= width) return;
	return <Fragment>{children}</Fragment>;
};

export default MediaQuery;
