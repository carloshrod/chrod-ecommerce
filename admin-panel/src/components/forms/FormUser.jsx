import { Grid, Stack } from '@mui/material';
import { Input, ActionsForm, InputSelect } from './';
import { useEffect } from 'react';
import { useGlobalContext } from '../../contexts';
import useForm from '../../hooks/useForm';
import validateUser from '../../validations/validateUser';
import { inputUserProps, ITEMS_WIDTH } from './consts';
import InputMask from 'react-input-mask';

export const initialForm = {
	displayName: '',
	email: '',
	countryCode: '',
	phoneNumber: '',
	role: '',
};

const FormUser = () => {
	const {
		form,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleSubmitStaff,
		handleReset,
	} = useForm(initialForm);
	const { dataToEdit } = useGlobalContext();

	useEffect(() => {
		setErrors(validateUser(form));
	}, [form]);

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmitStaff}
			sx={{ mt: 1, gap: 3 }}
		>
			<Grid container spacing={3}>
				{inputUserProps.map(input => (
					<Grid
						item
						xs={12}
						sm={ITEMS_WIDTH[input.name + 'Sm'] ?? 6}
						key={input.id}
					>
						{!input.mask ? (
							input.type !== 'select' ? (
								<Input
									{...input}
									value={form[input.name]}
									onChange={handleInputChange}
									errors={errors}
								/>
							) : (
								<InputSelect
									{...input}
									value={form[input.name]}
									onChange={handleSelectChange}
									errors={errors}
								/>
							)
						) : (
							<InputMask
								value={form[input.name]}
								mask={input.mask}
								maskPlaceholder=' '
								onChange={handleInputChange}
							>
								<Input {...input} value={form[input.name]} errors={errors} />
							</InputMask>
						)}
					</Grid>
				))}
			</Grid>
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={dataToEdit ? 'Edit' : 'Add'}
			/>
		</Stack>
	);
};

export default FormUser;
