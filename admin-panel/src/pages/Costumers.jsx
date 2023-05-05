import { Grid } from '@mui/material';
import { DataTable } from '../components';

const Costumers = () => {
	const costumers = [
		{
			uid: '1',
			displayName: 'Carlos Hernández',
			email: 'chrod@example.com',
			phone: '(315) 555-1212',
			role: 'Superadmin',
		},
		{
			uid: '2',
			displayName: 'Xailer Jiménez',
			email: 'xailerj@example.com',
			phone: '(305) 555-1212',
			role: 'Admin',
		},
		{
			uid: '3',
			displayName: 'Maribel Rodríguez',
			email: 'mary@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '4',
			displayName: 'Gabriela González',
			email: 'gaby@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '5',
			displayName: 'Orianna Fernández',
			email: 'orifer@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '6',
			displayName: 'Johan Vargas',
			email: 'johanv@example.com',
			phone: '(305) 555-1212',
			role: 'Admin',
		},
		{
			uid: '7',
			displayName: 'Johanna Pérez',
			email: 'jperez@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '8',
			displayName: 'Luis Herrera',
			email: 'luish@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '9',
			displayName: 'Darlys Arango',
			email: 'darango@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
		{
			uid: '10',
			displayName: 'José Silva',
			email: 'joses@example.com',
			phone: '(305) 555-1212',
			role: 'Costumer',
		},
	];

	return (
		<Grid item xs={12}>
			<DataTable costumers={costumers} />
		</Grid>
	);
};

export default Costumers;
