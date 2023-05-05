import { Card, CardMedia, Grid } from '@mui/material';
import { Loader, Profile, ProfileActions } from '../components';
import { useAuthContext } from '../contexts';
import { useEffect, useState } from 'react';

const Settings = () => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { loggedUser } = useAuthContext();

	useEffect(() => {
		setTimeout(() => {
			setIsDataFetched(true);
		}, 100);
	}, []);

	return (
		<Grid item xs={12}>
			{!isDataFetched ? (
				<Loader />
			) : (
				<Card className='myProfile'>
					<CardMedia
						component='img'
						height='300'
						image='/bg-user-info.jpg'
						alt='header image'
						sx={{ bgcolor: 'azure' }}
					/>
					<ProfileActions user={loggedUser} isLoggedUser={true} />
					<Profile user={loggedUser} isLoggedUser={true} />
				</Card>
			)}
		</Grid>
	);
};

export default Settings;
