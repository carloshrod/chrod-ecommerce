import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { SIGNIN } from '../../routes/paths';

const PrivateRoute = () => {
	const { isAuthenticated } = useAuthContext();

	return !isAuthenticated ? <Navigate to={SIGNIN} /> : <Outlet />;
};

export default PrivateRoute;
