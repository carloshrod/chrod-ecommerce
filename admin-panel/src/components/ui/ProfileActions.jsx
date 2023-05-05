import { CardActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext, useGlobalContext } from '../../contexts';
import { useParams } from 'react-router-dom';
import FormUser from '../forms/FormUser';
import { FormPassword, MyToolTip } from '..';
import UserServices from '../../services/UserServices';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const ProfileActions = ({ user, isLoggedUser = false }) => {
	const { isAdmin } = useAuthContext();
	const { dispatch } = useGlobalContext();
	const { deleteStaff } = UserServices();
	const { id } = useParams();

	const handleEdit = () => {
		dispatch({
			type: TYPES.SET_DATA_TO_EDIT,
			payload: {
				...user,
				countryCode: user.phoneNumber.slice(0, -15),
				phoneNumber: user.phoneNumber.slice(-14),
			},
		});
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: `Edit ${id ? 'user' : 'profile'}`,
				child: <FormUser />,
			},
		});
	};

	const handleChangePassword = () => {
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: 'Change password',
				child: <FormPassword />,
			},
		});
	};

	const handleDelete = async () => {
		await deleteStaff([id]);
	};

	return (
		<CardActions
			className='myProfileActions'
			sx={{ justifyContent: { xs: 'space-between', sm: 'end' }, p: 4 }}
		>
			{isAdmin || isLoggedUser ? (
				<MyToolTip title={`Edit ${id ? 'user' : 'profile'}`}>
					<IconButton aria-label='edit' onClick={handleEdit}>
						<EditIcon />
					</IconButton>
				</MyToolTip>
			) : null}
			{!id && (
				<MyToolTip title='Change password'>
					<IconButton
						aria-label='change password'
						onClick={handleChangePassword}
					>
						<PasswordIcon />
					</IconButton>
				</MyToolTip>
			)}
			{id && isAdmin && (
				<MyToolTip title='Delete user'>
					<IconButton aria-label='delete user' onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</MyToolTip>
			)}
		</CardActions>
	);
};

export default ProfileActions;
