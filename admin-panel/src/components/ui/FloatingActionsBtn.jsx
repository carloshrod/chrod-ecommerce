import { SpeedDial, SpeedDialAction } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { useGlobalContext } from '../../contexts';
import { FormRole } from '../';
import { ActionableList } from '../data';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const FloatingActionsBtn = () => {
	const { dispatch } = useGlobalContext();

	const handleAddRole = () => {
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: 'Add Role',
				child: <FormRole />,
			},
		});
	};

	const handleManageRole = () => {
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: 'User Roles',
				child: <ActionableList />,
			},
		});
	};

	const actions = [
		{ icon: <AddIcon />, name: 'Add role', onClick: () => handleAddRole() },
		{
			icon: <ListIcon />,
			name: 'List roles',
			onClick: () => handleManageRole(),
		},
	];

	return (
		<SpeedDial
			sx={{
				'& .MuiFab-primary': {
					width: 40,
					height: 40,
					backgroundColor: '#212548',
				},
			}}
			ariaLabel='floating actions'
			icon={<AdminPanelSettingsIcon />}
			direction='right'
			variant='outlined'
		>
			{actions.map(action => (
				<SpeedDialAction
					sx={{
						'&, &:hover': { backgroundColor: '#474c84' },
					}}
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					arrow
					onClick={action.onClick}
				/>
			))}
		</SpeedDial>
	);
};

export default FloatingActionsBtn;
