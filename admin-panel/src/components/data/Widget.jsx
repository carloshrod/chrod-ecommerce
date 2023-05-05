import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';

const Widget = ({ item }) => {
	return (
		<Grid item xs={12} sm={6} md={3}>
			<Card sx={{ backgroundColor: '#212548', color: '#e4e0e4' }}>
				<CardContent>
					<Grid container alignItems='center'>
						<Grid item xs={5} sm={4} sx={{ textAlign: 'center' }}>
							{item.icon}
						</Grid>
						<Grid item xs={7} sm={8} sx={{ textAlign: 'center' }}>
							<Typography variant='h5'>{item.label}</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Typography sx={{ fontSize: 14, margin: 'auto' }}>
						{item.data}
					</Typography>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default Widget;
