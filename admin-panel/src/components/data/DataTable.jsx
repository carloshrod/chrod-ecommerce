import {
	Box,
	Paper,
	Table,
	TableContainer,
	TablePagination,
} from '@mui/material';
import { DataTableToolbar, DataTableHead, DataTableBody } from './';
import { useLocation } from 'react-router-dom';
import { useTable } from '../../hooks';
import { COSTUMERS, PRODUCTS, STAFF } from '../../routes/paths';

export default function DataTable({ products, costumers, staff }) {
	const { pathname } = useLocation();

	const rows =
		pathname === PRODUCTS
			? products
			: pathname === COSTUMERS
			? costumers
			: pathname === STAFF
			? staff
			: null;

	const {
		selected,
		setSelected,
		order,
		orderBy,
		page,
		rowsPerPage,
		handleSelectAllClick,
		handleRequestSort,
		handleChangePage,
		handleChangeRowsPerPage,
		handleSelectOne,
	} = useTable(rows);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, px: 2, py: 1 }}>
				<DataTableToolbar selected={selected} setSelected={setSelected} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<DataTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<DataTableBody
							rows={rows}
							order={order}
							orderBy={orderBy}
							selected={selected}
							setSelected={setSelected}
							page={page}
							rowsPerPage={rowsPerPage}
							handleSelectOne={handleSelectOne}
						/>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
