import { createContext, useContext, useReducer } from 'react';
import globalReducers from './globalReducers';

const GlobalContext = createContext();

const initialState = {
	hideMenu: false,
	modal: {
		state: false,
		title: null,
		child: null,
	},
	dataToEdit: null,
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducers, initialState);
	const { hideMenu, modal, dataToEdit } = state;

	const data = {
		hideMenu,
		modal,
		dataToEdit,
		dispatch,
	};

	return (
		<GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
	);
};

const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
export { useGlobalContext };
