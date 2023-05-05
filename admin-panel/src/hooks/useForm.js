import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts';
import { useAuthContext } from '../contexts/auth/AuthContext';
import UserServices from '../services/UserServices';
import validatePassword from '../validations/validatePassword';
import { auth } from '../firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { errorHandler } from './utils';
import { GLOBAL_TYPES as TYPES } from '../actions';

const useForm = initialForm => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const { signIn, changePassword, logout } = useAuthContext();
	const {
		createStaff,
		updateStaff,
		createRole,
		updateRole,
		verifyExistingRole,
	} = UserServices();
	const { dataToEdit, dispatch } = useGlobalContext();

	useEffect(() => {
		if (dataToEdit) {
			setForm(dataToEdit);
		} else {
			setForm(initialForm);
		}
	}, []);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSelectChange = (name, options) => {
		setForm({
			...form,
			[name]: Array.isArray(options)
				? options.map(option => option?.value)
				: options?.value,
		});
		if (name === 'countryCode') {
			setForm({ ...form, countryCode: options?.value, phoneNumber: '' });
		}
	};

	const handleReset = () => {
		dispatch({ type: TYPES.CLOSE_MODAL });
		dispatch({ type: TYPES.CLEAN_DATA_TO_EDIT });
		setForm(initialForm);
	};

	const handleSignIn = async e => {
		e.preventDefault();
		try {
			await signIn(form);
		} catch (error) {
			toast.error(errorHandler(error));
			console.error(error.code);
		}
	};

	const handleSubmitStaff = async e => {
		e.preventDefault();
		try {
			if (!dataToEdit) {
				await createStaff(form);
			} else {
				await updateStaff(form);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			handleReset();
		}
	};

	const handleSubmitRole = async e => {
		e.preventDefault();
		try {
			if (await verifyExistingRole(dataToEdit?.roleName, form.roleName)) {
				if (!dataToEdit) {
					await createRole(form);
					handleReset();
				} else {
					await updateRole(form);
				}
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleChangePassword = e => {
		e.preventDefault();
		try {
			const user = auth.currentUser;
			const credential = EmailAuthProvider.credential(
				user.email,
				form.currentPassword
			);
			reauthenticateWithCredential(user, credential)
				.then(async () => {
					if (validatePassword(form)) {
						await changePassword(form.newPassword);
						handleReset();
						logout();
					}
				})
				.catch(error => {
					const errorMsg =
						error.code === 'auth/wrong-password'
							? 'Wrong current password'
							: errorHandler(error);
					toast.error(errorMsg);
					console.error(error.code);
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	return {
		form,
		setForm,
		errors,
		setErrors,
		handleInputChange,
		handleSelectChange,
		handleReset,
		handleSignIn,
		handleSubmitStaff,
		handleSubmitRole,
		handleChangePassword,
	};
};

export default useForm;
