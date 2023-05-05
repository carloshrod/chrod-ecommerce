import {
	Avatar,
	Box,
	CardContent,
	Chip,
	Grid,
	Switch,
	Typography,
} from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { MyToolTip } from '../';
import { useState } from 'react';
import UserServices from '../../services/UserServices';
import { useAuthContext, useUsersContext } from '../../contexts';
import { setRoleName } from '../utils';

const Profile = ({ user, isLoggedUser = false }) => {
	const { isAdmin } = useAuthContext();
	const [checked, setChecked] = useState(!user?.disabled);
	const { toggleStatus } = UserServices();
	const { roles } = useUsersContext();

	const userRole = roles.find(role => role.roleName === user.role);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	return (
		<CardContent sx={{ p: 3 }}>
			<Grid container className='myProfileContent'>
				<Grid
					item
					xs={12}
					sm={5}
					sx={{ textAlign: 'center', mt: { xs: -11, sm: -13 } }}
				>
					<Avatar
						alt='Superadmin'
						src='/my-avatar.png'
						sx={{
							width: { xs: 120, sm: 150 },
							height: { xs: 120, sm: 150 },
							m: 'auto',
							mb: 1,
						}}
					/>
					<Box mb={2}>
						<Typography variant='h5'>{user?.displayName}</Typography>
						{isLoggedUser ? null : isAdmin ? (
							<MyToolTip
								title={`${user?.disabled ? 'Enable' : 'Disable'} user`}
							>
								<Switch
									checked={checked}
									onChange={handleChange}
									inputProps={{ 'aria-label': 'toggle' }}
									onClick={() => toggleStatus(user)}
									color='success'
								/>
							</MyToolTip>
						) : null}
					</Box>
					<Typography className='contact'>
						<EmailIcon />
						{user?.email}
					</Typography>
					<Typography className='contact'>
						<PhoneIphoneIcon />
						{user?.phoneNumber}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={7}
					sx={{ alignSelf: 'center', textAlign: 'justify' }}
				>
					<Chip
						label={setRoleName(user.role)}
						color='success'
						sx={{ mx: 2, my: 1 }}
					/>
					<Typography element={'p'} mx={2}>
						{userRole?.description}
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	);
};

export default Profile;
