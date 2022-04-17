import { NavLink } from 'react-router-dom';

const IconLink = ({ icon: Icon, to, className }) => {
  const styles = [
    'grid place-items-center px-8 py-6 text-inherit hover:bg-[#edf2f7]',
    'dark:hover:bg-[#ffffff14]',
    'lg:rounded-lg'
  ]
	const classes = [...styles, className].filter(style => !!style).join(' ').trim();
  return (
		<NavLink to={to} className={classes}>
			<Icon className='w-6 h-6' />
		</NavLink>
	);
};

export default IconLink;
