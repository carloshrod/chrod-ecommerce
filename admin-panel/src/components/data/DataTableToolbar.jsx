import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import { useAuthContext, useGlobalContext } from '../../contexts';
import { FormUser, FloatingActionsBtn, MyToolTip } from '../';
import UserServices from '../../services/UserServices';
import { COSTUMERS, STAFF } from '../../routes/paths';
import { GLOBAL_TYPES as TYPES } from '../../actions';

const DataTableToolbar = ({ selected, setSelected }) => {
	const { isAdmin } = useAuthContext();
	const { pathname } = useLocation();
	const { dispatch } = useGlobalContext();
	const { deleteStaff } = UserServices();
	const isProduct = pathname === '/admin/products';
	const numSelected = selected.length;

	const handleAddStaff = () => {
		dispatch({
			type: TYPES.OPEN_MODAL,
			payload: {
				state: true,
				title: `Add ${isProduct ? 'Product' : 'Staff'}`,
				child: <FormUser />,
			},
		});
	};

	const handleDelete = async data => {
		await deleteStaff(data);
		setSelected([]);
	};

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: theme =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				gap: 2,
			}}
		>
			{numSelected > 0 ? (
				<Typography color='inherit' variant='subtitle1' component='div'>
					{numSelected} selected
				</Typography>
			) : pathname === STAFF ? (
				<FloatingActionsBtn action />
			) : (
				'Filter'
			)}

			{numSelected > 0 ? (
				<MyToolTip title='Delete'>
					<IconButton onClick={() => handleDelete(selected)}>
						<DeleteIcon />
					</IconButton>
				</MyToolTip>
			) : pathname === COSTUMERS ? null : (
				<MyToolTip title={isAdmin ? '' : 'Allowed for admins only'}>
					<span>
						<Button
							sx={{
								width: '180px',
								fontSize: { xs: 12, sm: 14 },
								cursor: `${!isAdmin && 'not-allowed'}`,
							}}
							variant='outlined'
							color='primary'
							onClick={handleAddStaff}
							disabled={!isAdmin}
						>
							Add {pathname.slice(7)}
						</Button>
					</span>
				</MyToolTip>
			)}
		</Toolbar>
	);
};

export default DataTableToolbar;
