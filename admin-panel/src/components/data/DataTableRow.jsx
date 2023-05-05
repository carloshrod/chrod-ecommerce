import {
	Checkbox,
	Chip,
	IconButton,
	Switch,
	TableCell,
	TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { FormUser, MyToolTip } from '../';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext, useGlobalContext } from '../../contexts';
import UserServices from '../../services/UserServices';
import { useState } from 'react';
import { setRoleName } from '../utils';
import { COSTUMERS, STAFF } from '../../routes/paths';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const DataTableRow = ({ row, isItemSelected, handleSelectOne, labelId }) => {
	const { dispatch } = useGlobalContext();
	const { isAdmin } = useAuthContext();
	const navigate = useNavigate();
	const { toggleStatus } = UserServices();
	const [checked, setChecked] = useState(!row.disabled);

	const handleChange = event => {
		setChecked(event.target.checked);
	};

	const { pathname } = useLocation();
	const isUser = pathname === COSTUMERS || pathname === STAFF;

	const handleEdit = data => {
		dispatch({
			type: TYPES.SET_DATA_TO_EDIT,
			payload: {
				...data,
				countryCode: data.phoneNumber.slice(0, -15),
				phoneNumber: data.phoneNumber.slice(-14),
			},
		});
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: `Edit ${pathname === STAFF ? 'Staff' : 'Costumer'}`,
				child: <FormUser />,
			},
		});
	};

	const handleStatus = data => {
		toggleStatus(data);
	};

	const handleDetails = data => {
		navigate(`${pathname}/${data.uid}`);
	};

	const actions = [
		{
			label: isAdmin ? 'Edit' : 'Allowed for admins only',
			icon: <EditIcon />,
			onClick: isAdmin ? handleEdit : null,
		},
		{
			label: 'Details',
			icon: <ZoomInIcon />,
			onClick: handleDetails,
		},
	];

	return (
		<TableRow
			hover
			role='checkbox'
			aria-checked={isItemSelected}
			tabIndex={-1}
			key={row.uid}
			selected={isItemSelected}
		>
			<TableCell padding='checkbox'>
				<MyToolTip title={!isAdmin ? 'Allowed for admins only' : null}>
					<span>
						<Checkbox
							onClick={event => handleSelectOne(event, row.uid)}
							color='primary'
							checked={isItemSelected}
							inputProps={{
								'aria-labelledby': labelId,
							}}
							disabled={!isAdmin}
						/>
					</span>
				</MyToolTip>
			</TableCell>
			<TableCell component='th' id={labelId} scope='row' padding='normal'>
				{isUser ? row.displayName : row.name}
			</TableCell>
			<TableCell>{isUser ? row.email : row.price}</TableCell>
			<TableCell>{isUser ? setRoleName(row.role) : row.category}</TableCell>
			<TableCell align='center'>
				{isUser ? (
					<MyToolTip
						title={`${
							isAdmin
								? row.disabled
									? 'Enable user'
									: 'Disable user'
								: 'Allowed for admins only'
						}`}
					>
						<span>
							<Switch
								checked={checked}
								onChange={handleChange}
								onClick={() => handleStatus(row)}
								color='success'
								disabled={!isAdmin}
							/>
						</span>
					</MyToolTip>
				) : (
					<Chip
						label={row.status}
						color={`${
							row.status === 'Sold out'
								? 'warning'
								: row.status === 'In stock'
								? 'success'
								: 'null'
						}`}
					/>
				)}
			</TableCell>
			<TableCell align='center'>
				{actions
					.filter(action => (!isUser ? action.label !== 'Status' : action))
					.map((action, i) => (
						<MyToolTip key={i} title={action.label}>
							<span>
								<IconButton
									onClick={() => action.onClick(row)}
									disabled={!isAdmin && action.label !== 'Details'}
								>
									{action.icon}
								</IconButton>
							</span>
						</MyToolTip>
					))}
			</TableCell>
		</TableRow>
	);
};

export default DataTableRow;
