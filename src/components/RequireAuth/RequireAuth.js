import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';

const RequireAuth = (props) => {
	const { user } = useAuth();
	const location = useLocation();
  const isRequired = !props.false;
	return (
    isRequired
      ? user
        ? <Outlet />
	      : <Navigate to='/login' state={{ from: location }} replace />
      : user
        ? <Navigate to='/messages' state={{ from: location }} replace />
        : <Outlet />
	);
};

export default RequireAuth;
