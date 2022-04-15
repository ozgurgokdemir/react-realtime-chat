import { Link } from 'react-router-dom';

const IconLink = ({ icon: Icon, to, className }) => {
  const styles = [
    'grid place-items-center p-4 aspect-square rounded-lg text-inherit hover:bg-[#edf2f7]',
    'dark:hover:bg-[#ffffff14]'
  ]
	const classes = [...styles, className].filter(style => !!style).join(' ').trim();
  return (
		<Link to={to} className={classes}>
			<Icon className='w-6 h-6' />
		</Link>
	);
};

export default IconLink;
