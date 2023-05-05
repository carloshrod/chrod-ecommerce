import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useLocation } from 'react-router-dom';
import { COSTUMERS, STAFF } from '../../routes/paths';
import { useAuthContext } from '../../contexts';
import { MyToolTip } from '../';

const DataTableHead = ({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
}) => {
	const { isAdmin } = useAuthContext();
	const { pathname } = useLocation();
	const isUser = pathname === COSTUMERS || pathname === STAFF;

	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	const headCells = [
		{
			id: 'name',
			label: 'Name',
		},
		{
			id: isUser ? 'email' : 'price',
			label: isUser ? 'Email' : 'Price',
		},
		{
			id: isUser ? 'role' : 'category',
			label: isUser ? 'Role' : 'Category',
		},
		{
			id: 'status',
			label: 'Status',
		},
	];

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<MyToolTip title={!isAdmin ? 'Allowed for admins only' : null}>
						<span>
							<Checkbox
								color='primary'
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={rowCount > 0 && numSelected === rowCount}
								onChange={onSelectAllClick}
								inputProps={{
									'aria-label': 'select all desserts',
								}}
								disabled={!isAdmin}
							/>
						</span>
					</MyToolTip>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
						align={headCell.id === 'status' ? 'center' : 'inherit'}
						sx={{ pl: `${headCell.id === 'status' ? '40px' : ''}` }}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align='center'>Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default DataTableHead;
