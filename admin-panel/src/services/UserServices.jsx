import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import AuthServices from './AuthServices';
import { useNavigate } from 'react-router-dom';
import { STAFF } from '../routes/paths';
import { useUsersContext } from '../contexts/users/UsersContext';
import { USERS_TYPES as TYPES } from '../actions';

const UserServices = () => {
	const { dispatch } = useUsersContext();
	const { authRegisterUser, authUpdateUser, authDisableUser, authDeleteUser } =
		AuthServices();
	const navigate = useNavigate();

	const staffCollectionRef = collection(db, 'staff');
	const rolesCollectionRef = collection(db, 'roles');

	const createStaff = async user => {
		try {
			const { displayName, email, countryCode, phoneNumber, role } = user;
			const res = await authRegisterUser(user);
			if (res.status === 201) {
				const userRecord = res.data;
				const { uid } = userRecord;
				const userToCreate = {
					uid,
					displayName,
					email,
					phoneNumber: `${countryCode} ${phoneNumber}`,
					role,
					createdAt: serverTimestamp(),
					lastUpdate: serverTimestamp(),
					disabled: false,
				};
				await setDoc(doc(staffCollectionRef, uid), userToCreate);
				dispatch({ type: TYPES.ADD_USER, payload: userToCreate });
				toast.success('User registered!');
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.log(error);
		}
	};

	const updateStaff = async user => {
		try {
			const { displayName, email, countryCode, phoneNumber, role, uid } = user;
			const res = await authUpdateUser(uid, user);
			if (res.status === 200) {
				await updateDoc(doc(staffCollectionRef, uid), {
					displayName,
					email,
					phoneNumber: `${countryCode} ${phoneNumber}`,
					role,
					lastUpdate: serverTimestamp(),
				});
				toast.success('User updated!');
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error.message);
		}
	};

	const toggleStatus = async user => {
		try {
			const res = await authDisableUser(user.uid, { disabled: user.disabled });
			if (res.status === 200) {
				await updateDoc(doc(staffCollectionRef, user.uid), {
					disabled: !user.disabled,
					lastUpdate: serverTimestamp(),
				});
				toast.success(`User ${user.disabled ? 'enabled' : 'disabled'}!`);
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error);
		}
	};

	const deleteStaff = async data => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Are you sure to delete ${
					data.length > 1 ? 'these users' : 'this user'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				confirmButtonText: 'Aceptar',
				cancelButtonColor: '#dc4035',
				cancelButtonText: 'Cancelar',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				await data.forEach(async uid => {
					await authDeleteUser(uid);
					deleteDoc(doc(staffCollectionRef, uid));
				});
				navigate(STAFF);
				toast.success(`${data.length > 1 ? 'Users' : 'User'} deleted!`);
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error);
		}
	};

	const createRole = async role => {
		try {
			const { roleName, permissions, description } = role;
			const name = roleName.toLowerCase().split(' ').join('_');
			const docRef = await addDoc(rolesCollectionRef, {
				roleName: name,
				permissions,
				description,
				createdAt: serverTimestamp(),
				lastUpdate: serverTimestamp(),
			});
			await updateDoc(doc(rolesCollectionRef, docRef.id), {
				roleId: docRef.id,
			});
			toast.success('Role added!');
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error.message);
		}
	};

	const updateRole = async role => {
		try {
			const { roleName, permissions, description, roleId } = role;
			const name = roleName.toLowerCase().split(' ').join('_');
			await updateDoc(doc(rolesCollectionRef, roleId), {
				roleName: name,
				permissions,
				description,
				lastUpdate: serverTimestamp(),
			});
			toast.success('Role updated!');
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error.message);
		}
	};

	const deleteRole = async data => {
		try {
			const resConfirm = await Swal.fire({
				icon: 'warning',
				html: `¿Are you sure to delete ${
					data.length > 1 ? 'these roles' : 'this role'
				} permanently? <br> <br> <b>¡You won't be able to revert this action!</b>`,
				showCancelButton: true,
				confirmButtonColor: '#20cb84',
				confirmButtonText: 'Aceptar',
				cancelButtonColor: '#dc4035',
				cancelButtonText: 'Cancelar',
				width: '24em',
			});
			if (resConfirm.isConfirmed) {
				await data.forEach(roleId => {
					deleteDoc(doc(rolesCollectionRef, roleId));
				});
				toast.success(`${data.length > 1 ? 'Roles' : 'Role'} deleted!`);
			}
		} catch (error) {
			toast.error(error.response?.data?.msg || error.message);
			console.error(error);
		}
	};

	const verifyExistingRole = async (currentRoleName = '', roleName) => {
		const q = query(
			rolesCollectionRef,
			where('roleName', '==', roleName.toLowerCase().split(' ').join('_'))
		);
		const querySnapshot = await getDocs(q);
		if (
			currentRoleName?.toLowerCase().split(' ').join('_') !==
			roleName.toLowerCase().split(' ').join('_')
		) {
			if (querySnapshot.docs[0]) {
				toast.error('This role already exists!');
				return false;
			}
		}
		return true;
	};

	return {
		createStaff,
		updateStaff,
		toggleStatus,
		deleteStaff,
		createRole,
		updateRole,
		deleteRole,
		verifyExistingRole,
	};
};

export default UserServices;
