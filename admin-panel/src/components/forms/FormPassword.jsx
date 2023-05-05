import { Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Input, ActionsForm } from './';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import validatePassword from '../../validations/validatePassword';

const initialForm = {
	currentPassword: '',
	newPassword: '',
	repeatNewPassword: '',
};

const FormChangePassword = () => {
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleReset,
		handleChangePassword,
	} = useForm(initialForm);

	const inputProps = [
		{
			id: 'idCurrentPassword',
			name: 'currentPassword',
			label: 'Current password',
		},
		{
			id: 'idNewPassword',
			name: 'newPassword',
			label: 'New password',
		},
		{
			id: 'idRepeatNewPassword',
			name: 'repeatNewPassword',
			label: 'Repeat new password',
		},
	];

	useEffect(() => {
		setErrors(validatePassword(form));
	}, [form]);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			sx={{ mt: 1, gap: 3 }}
			onSubmit={handleChangePassword}
		>
			{inputProps.map(input => (
				<Input
					key={input.id}
					{...input}
					value={form[input.name]}
					onChange={handleInputChange}
					errors={errors}
					type='password'
					icon={<LockIcon />}
				/>
			))}
			<ActionsForm handleReset={handleReset} errors={errors} />
		</Stack>
	);
};

export default FormChangePassword;
