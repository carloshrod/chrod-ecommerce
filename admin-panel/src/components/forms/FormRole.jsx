import { Stack } from '@mui/material';
import { Input, ActionsForm, InputSelect } from './';
import { ActionableList } from '../data';
import { inputRoleProps } from './consts';
import useForm from '../../hooks/useForm';
import { useGlobalContext } from '../../contexts';
import { useEffect } from 'react';
import validateRole from '../../validations/validateRole';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const initialForm = {
	roleName: '',
	permissions: [],
	description: '',
};

const FormRole = () => {
	const {
		form,
		errors,
		setErrors,
		handleReset,
		handleInputChange,
		handleSelectChange,
		handleSubmitRole,
	} = useForm(initialForm);
	const { dataToEdit, dispatch } = useGlobalContext();

	useEffect(() => {
		setErrors(validateRole(form));
	}, [form]);

	const handleSubmit = e => {
		handleSubmitRole(e);
		if (dataToEdit) {
			dispatch({
				type: TYPES.OPEN_MODAL,
				payload: {
					state: true,
					title: 'User Roles',
					child: <ActionableList />,
				},
			});
		}
	};

	return (
		<Stack
			component='form'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
			sx={{ mt: 1, gap: 3, width: 430 }}
		>
			{inputRoleProps.map(input =>
				input.type !== 'autocomplete' ? (
					<Input
						key={input.id}
						{...input}
						value={form[input.name]}
						onChange={handleInputChange}
						errors={errors}
					/>
				) : (
					<InputSelect
						key={input.id}
						{...input}
						value={form[input.name]}
						onChange={handleSelectChange}
						errors={errors}
					/>
				)
			)}
			<ActionsForm
				handleReset={handleReset}
				errors={errors}
				label={dataToEdit ? 'Edit' : 'Add'}
			/>
		</Stack>
	);
};

export default FormRole;
