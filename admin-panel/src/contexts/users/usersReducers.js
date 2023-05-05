import { USERS_TYPES as TYPES } from '../../actions';

const usersReducers = (state, action) => {
	switch (action.type) {
		case TYPES.GET_ALL_STAFF: {
			return {
				...state,
				staff: action.payload,
			};
		}
		case TYPES.GET_ALL_ROLES: {
			return {
				...state,
				roles: action.payload,
			};
		}
		case TYPES.GET_ONE_USER: {
			return {
				...state,
				user: action.payload,
			};
		}
		case TYPES.ADD_USER: {
			return {
				...state,
				staff: [...state.staff, action.payload],
			};
		}
		default:
			return state;
	}
};

export default usersReducers;
