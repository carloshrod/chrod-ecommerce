import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../contexts';

const MyContainer = ({ children }) => {
	const { hideMenu } = useGlobalContext();
	const { pathname } = useLocation();

	const TITLES = {
		'/admin': 'Dashboard',
		'/admin/products': 'Products',
		'/admin/costumers': 'Costumers',
		'/admin/staff': 'Staff',
		'/admin/settings': 'Settings',
	};

	return (
		<Box
			className={`myContainer ${hideMenu ? 'myContainer--left' : null}`}
			id={!hideMenu ? null : 'right'}
		>
			<Typography variant='h4'>{TITLES[pathname]}</Typography>
			<Grid container spacing={3} py={2}>
				{children}
			</Grid>
		</Box>
	);
};

export default MyContainer;
