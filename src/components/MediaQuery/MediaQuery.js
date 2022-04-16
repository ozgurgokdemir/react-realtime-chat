import { Fragment, useContext } from 'react';
import { MediaContext } from '../../store/media-context';

const MediaQuery = ({ min, max, children }) => {
  const { width, breakpoints } = useContext(MediaContext);
  const isUnderMin = width < breakpoints[min];
  const isAboveMax = width >= breakpoints[max];
  if (isUnderMin || isAboveMax) return;
	return <Fragment>{children}</Fragment>;
};

export default MediaQuery;
