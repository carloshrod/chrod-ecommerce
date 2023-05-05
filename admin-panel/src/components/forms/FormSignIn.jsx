import { Box, Stack, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Input } from './';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import validateSignIn from '../../validations/validateSignIn';

const initialForm = {
	email: 'chrod@admin.com',
	password: 'C4rl05_4dm1n',
};

const FormSignIn = () => {
	const { form, errors, setErrors, handleInputChange, handleSignIn } =
		useForm(initialForm);

	const inputProps = [
		{
			id: 'idEmail',
			name: 'email',
			label: 'Email',
			icon: <EmailIcon />,
		},
		{
			id: 'idPassword',
			name: 'password',
			type: 'password',
			label: 'Password',
			icon: <LockIcon />,
		},
	];

	useEffect(() => {
		setErrors(validateSignIn(form));
	}, [form]);

	return (
		<Box className='formSignIn'>
			<Stack
				component='form'
				noValidate
				autoComplete='off'
				onSubmit={handleSignIn}
			>
				<img src='/logo-ecommerce-admin.png' alt='logo' />
				<Typography
					sx={{ fontWeight: 'bold', display: { md: 'none' } }}
					variant='h4'
					color='#e4e0e4'
					gutterBottom
				>
					WELCOME!
				</Typography>
				<Typography sx={{ fontSize: 11, mb: 3 }} gutterBottom>
					Use your email and password to sign in:
				</Typography>
				{inputProps.map(input => (
					<Box key={input.id} mb={3}>
						<Input
							{...input}
							value={form[input.name]}
							onChange={handleInputChange}
							errors={errors}
						/>
					</Box>
				))}
				<Typography
					sx={{ fontSize: 12, textAlign: 'right', mb: 1 }}
					gutterBottom
				>
					<Link to='/forgot-password'>Forgot password?</Link>
				</Typography>
				<Button
					sx={{ width: '100%' }}
					variant='contained'
					type='submit'
					disabled={!(Object.keys(errors).length === 0)}
				>
					Login
				</Button>
			</Stack>
		</Box>
	);
};

export default FormSignIn;
