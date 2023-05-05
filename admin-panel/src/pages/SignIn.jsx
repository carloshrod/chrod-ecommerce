import { FormSignIn } from '../components';
import { Grid, Typography } from '@mui/material';

const SignIn = () => {
	return (
		<Grid container className='signIn'>
			<Grid item xs={12} md={4.6}>
				<FormSignIn />
			</Grid>
			<Grid item md={7.4} className='signIn__right'>
				<Typography
					sx={{ fontWeight: 'bold', paddingTop: 10, paddingLeft: 4 }}
					variant='h2'
					color='primary'
					gutterBottom
				>
					Welcome!
				</Typography>
				<Typography
					sx={{ display: 'block', paddingLeft: 4 }}
					variant='h7'
					color='secondary'
					gutterBottom
				>
					Ecommerce management software
				</Typography>
			</Grid>
		</Grid>
	);
};

export default SignIn;
