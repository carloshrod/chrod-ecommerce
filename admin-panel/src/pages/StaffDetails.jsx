import { Breadcrumbs, Card, CardMedia, Grid, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Loader, Profile, ProfileActions } from '../components';
import { useUsersContext } from '../contexts';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { STAFF } from '../routes/paths';

const StaffDetails = () => {
	const [isDataFetched, setIsDataFetched] = useState(false);
	const { getOneUser, user } = useUsersContext();
	const { id } = useParams();

	useEffect(() => {
		getOneUser(id);
		setTimeout(() => {
			setIsDataFetched(true);
		}, 100);
	}, []);

	const breadcrumbs = [
		<Link key='1' to={STAFF}>
			<Typography
				key='2'
				color='#b2b7bc'
				sx={{ '&:hover': { color: '#e4e0e4' } }}
			>
				Staff
			</Typography>
		</Link>,
		<Typography key='2' color='#e4e0e4'>
			Details
		</Typography>,
	];

	return (
		<Grid item xs={12}>
			<Breadcrumbs
				pb={2}
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				{breadcrumbs}
			</Breadcrumbs>
			{!isDataFetched ? (
				<Loader />
			) : (
				<Card className='myProfile'>
					<CardMedia
						component='img'
						height='300'
						image='/bg-user-info-2.jpg'
						alt='header image'
						sx={{ bgcolor: 'azure' }}
					/>
					<ProfileActions user={user} />
					<Profile user={user} />
				</Card>
			)}
		</Grid>
	);
};

export default StaffDetails;
