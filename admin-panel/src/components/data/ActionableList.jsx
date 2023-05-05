import {
	Box,
	Button,
	Checkbox,
	Chip,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useGlobalContext, useUsersContext } from '../../contexts';
import UserServices from '../../services/UserServices';
import { FormRole, MyToolTip } from '../';
import { setRoleName } from '../utils';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const ActionableList = () => {
	const [checked, setChecked] = useState([]);
	const { dispatch } = useGlobalContext();
	const { roles } = useUsersContext();
	const { deleteRole } = UserServices();

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleClose = () => {
		dispatch({ type: TYPES.CLOSE_MODAL });
	};

	const handleDelete = async () => {
		await deleteRole(checked);
		setChecked([]);
	};

	const handleEdit = data => {
		dispatch({
			type: TYPES.SET_DATA_TO_EDIT,
			payload: { ...data, roleName: setRoleName(data.roleName) },
		});
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: 'Edit Role',
				child: <FormRole />,
			},
		});
	};

	return (
		<Stack>
			{checked.length > 0 ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: '#26294f',
						borderRadius: 1,
						pl: 2,
						mb: 1,
					}}
				>
					<span>{`${checked.length} selected`}</span>
					<MyToolTip title={`Delete ${checked.length > 1 ? 'roles' : 'role'}`}>
						<IconButton onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
					</MyToolTip>
				</Box>
			) : null}
			<List sx={{ pt: 0 }}>
				<Divider />
				{roles.length > 0 ? (
					roles.map(role => {
						const labelId = `checkbox-list-label-${role.roleId}`;

						return (
							<Box key={role.roleId}>
								<ListItem dense>
									<Checkbox
										edge='start'
										checked={checked.indexOf(role.roleId) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
										onClick={handleToggle(role.roleId)}
									/>
									<ListItemText
										id={labelId}
										primary={setRoleName(role.roleName)}
									/>
									<IconButton sx={{ ml: 1 }} onClick={() => handleEdit(role)}>
										<EditIcon />
									</IconButton>
								</ListItem>
								<Divider />
							</Box>
						);
					})
				) : (
					<Chip
						label='Please, start to add roles!'
						variant='outlined'
						sx={{ color: '#e4e0e4', p: 3 }}
						color='primary'
					/>
				)}
			</List>
			<Button
				sx={{ width: 'fit-content', margin: 'auto', mt: 1 }}
				variant='outlined'
				color='warning'
				onClick={handleClose}
			>
				Close
			</Button>
		</Stack>
	);
};

export default ActionableList;
