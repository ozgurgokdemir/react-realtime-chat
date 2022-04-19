import { NavLink } from 'react-router-dom';

const IconLink = ({ icon: Icon, to, className }) => {
  
  const handleStyles = ({ isActive }) => {
    const styles = 'grid place-items-center h-16 flex-1 text-inherit lg:rounded-lg';
    const active = 'text-[color:#3182ce] dark:text-[color:#90cdf4]';
    return [styles, (isActive && active), className].filter(style => !!style).join(' ');
  }
  return (
		<NavLink to={to} className={handleStyles}>
			<Icon size='28' />
		</NavLink>
	);
};

export default IconLink;
