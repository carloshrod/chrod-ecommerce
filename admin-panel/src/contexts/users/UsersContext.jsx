import { createContext, useContext, useEffect, useReducer } from 'react';
import {
	collection,
	query,
	onSnapshot,
	orderBy,
	doc,
	getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-hot-toast';
import usersReducers from './usersReducers';
import { USERS_TYPES as TYPES } from '../../actions';

const UsersContext = createContext();

const initialState = {
	staff: [],
	roles: [],
	user: {},
};

const UsersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(usersReducers, initialState);
	const { staff, roles, user } = state;

	const staffCollectionRef = collection(db, 'staff');
	const rolesCollectionRef = collection(db, 'roles');

	const fetchData = async (ref, type) => {
		const q = query(ref, orderBy('createdAt', 'asc'));
		try {
			const querySnapshot = await getDocs(q);
			const array = [];
			querySnapshot.forEach(doc => {
				array.push(doc.data());
			});
			dispatch({ type, payload: array });
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		}

		// const unsub = onSnapshot(q, querySnapshot => {
		// 	try {
		// 		const array = [];
		// 		querySnapshot.forEach(doc => {
		// 			array.push(doc.data());
		// 		});
		// 		dispatch({ type, payload: array });
		// 	} catch (error) {
		// 		toast.error(error.message);
		// 		console.error(error);
		// 	}
		// });
		// return () => unsub();
	};

	useEffect(() => {
		fetchData(staffCollectionRef, TYPES.GET_ALL_STAFF);
		fetchData(rolesCollectionRef, TYPES.GET_ALL_ROLES);
	}, []);

	const getOneUser = userId => {
		const unsub = onSnapshot(doc(db, 'staff', userId), doc => {
			dispatch({ type: TYPES.GET_ONE_USER, payload: doc.data() });
		});
		return () => unsub();
	};

	const data = {
		staff,
		roles,
		user,
		getOneUser,
		dispatch,
	};

	return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
export { useUsersContext };
