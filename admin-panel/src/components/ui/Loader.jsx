import { Box } from '@mui/material';

const Loader = ({ preLoader = false }) => {
	return (
		<Box className='loader'>
			{preLoader && <img src='/logo-ecommerce-admin.png' alt='logo' />}
			<span></span>
		</Box>
	);
};

export default Loader;
