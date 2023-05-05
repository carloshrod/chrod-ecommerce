import axios from 'axios';
import { useAuthContext } from '../contexts/auth/AuthContext';

const AuthServices = () => {
	const { idToken } = useAuthContext();

	axios.defaults.baseURL = 'http://localhost:5000/api/v1/auth';

	const apiRequest = axios.create({
		timeout: 5000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${idToken}`,
		},
	});

	const authRegisterUser = async body => {
		return await apiRequest.post('/', body);
	};

	const authUpdateUser = async (param, body) => {
		return await apiRequest.put(`/${param}`, body);
	};

	const authDisableUser = async (param, body) => {
		return await apiRequest.patch(`/${param}`, body);
	};

	const authDeleteUser = async param => {
		return await apiRequest.delete(`/${param}`);
	};

	return {
		// authGetAllUsers,
		authRegisterUser,
		authUpdateUser,
		authDisableUser,
		authDeleteUser,
	};
};

export default AuthServices;
