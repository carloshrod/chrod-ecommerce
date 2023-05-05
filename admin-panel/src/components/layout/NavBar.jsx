import { Box, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import ToggleSidebar from './ToggleSidebar';
import { MyToolTip } from '../';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import { SETTINGS } from '../../routes/paths';

const NavBar = () => {
	const { logout } = useAuthContext();

	return (
		<Box
			className='navbar'
			sx={{ flexGrow: 1, px: { xs: 2, sm: 2, md: 3, lg: 5 } }}
		>
			<Toolbar>
				<ToggleSidebar />
				<div className='navbar__logo'>
					<img src='/logo-ecommerce-admin.png' alt='logo' />
					<Typography variant='h5' component='div'>
						<span>ECOMMERCE</span> ADMIN
					</Typography>
				</div>
				<div className='navbar__options'>
					<MyToolTip title='Settings'>
						<IconButton sx={{ p: 0 }}>
							<Link to={SETTINGS}>
								<Avatar alt='avatar' src='/my-avatar.png' />
							</Link>
						</IconButton>
					</MyToolTip>
					<MyToolTip title='Logout '>
						<IconButton onClick={() => logout()}>
							<PowerSettingsNewSharpIcon sx={{}} />
						</IconButton>
					</MyToolTip>
				</div>
			</Toolbar>
		</Box>
	);
};

export default NavBar;
