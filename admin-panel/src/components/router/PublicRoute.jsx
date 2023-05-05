import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { ADMIN } from '../../routes/paths';

const PublicRoute = () => {
	const { path } = useAuthContext();
	const { isAuthenticated } = useAuthContext();

	return isAuthenticated ? (
		<Navigate to={!path?.includes('admin') ? ADMIN : path} />
	) : (
		<Outlet />
	);
};

export default PublicRoute;
