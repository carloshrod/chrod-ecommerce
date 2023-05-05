import { createContext, useContext, useEffect, useState } from 'react';
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updatePassword,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [idToken, setIdToken] = useState(null);
	const { pathname } = useLocation();
	const [path, setPath] = useState(pathname);
	const isAdmin = loggedUser?.role === 'admin';

	const signIn = ({ email, password }) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		const resConfirm = await Swal.fire({
			icon: 'question',
			html: `¿Are you sure you want to log out?`,
			showCancelButton: true,
			confirmButtonColor: '#20cb84',
			confirmButtonText: 'Aceptar',
			cancelButtonColor: '#dc4035',
			cancelButtonText: 'Cancelar',
			width: '24em',
		});
		if (resConfirm.isConfirmed) {
			setIsAuthenticated(false);
			return signOut(auth);
		}
	};

	const getUserData = async uid => {
		const userDoc = await getDoc(doc(db, 'staff', uid));
		return userDoc.data();
	};

	useEffect(() => {
		onAuthStateChanged(auth, async currentUser => {
			if (currentUser) {
				const userData = await getUserData(currentUser.uid);
				setLoggedUser(userData);
				setIdToken(await currentUser.getIdToken());
				setIsAuthenticated(true);
			}
		});
		setPath(pathname);
		setTimeout(() => {
			setPath(null);
		}, 3000);
	}, []);

	useEffect(() => {
		if (isAuthenticated && loggedUser) {
			const unsub = onSnapshot(doc(db, 'staff', loggedUser.uid), doc => {
				const data = doc.data();
				setLoggedUser(data);
			});
			return () => unsub();
		}
	}, [isAuthenticated, loggedUser]);

	const changePassword = newPassword => {
		const user = auth.currentUser;
		return updatePassword(user, newPassword);
	};

	const data = {
		signIn,
		loggedUser,
		idToken,
		isAuthenticated,
		isAdmin,
		logout,
		changePassword,
		path,
		setPath,
	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
