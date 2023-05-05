import { Grid } from '@mui/material';
import { DataTable } from '../components';
import { useAuthContext, useUsersContext } from '../contexts';

const Staff = () => {
	const { staff } = useUsersContext();
	const { loggedUser } = useAuthContext();

	return (
		<Grid item xs={12}>
			<DataTable staff={staff.filter(item => item.uid !== loggedUser.uid)} />
		</Grid>
	);
};

export default Staff;
