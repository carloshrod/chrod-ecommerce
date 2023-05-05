import { Grid } from '@mui/material';
import { DataTable } from '../components';

const Products = () => {
	const products = [
		{
			uid: '1',
			sku: 'PD01B20',
			name: 'Laptop Asus',
			price: '$499.99',
			stock: '40',
			category: 'Computers',
			status: 'In stock',
		},
		{
			uid: '2',
			sku: 'PD02B10',
			name: 'Laptop MSI',
			price: '$399.99',
			stock: '20',
			category: 'Computers',
			status: 'In stock',
		},
		{
			uid: '3',
			sku: 'PD03B40',
			name: 'Headphones Gamer Logitech',
			price: '$399.99',
			stock: '25',
			category: 'Gaming',
			status: 'Sold out',
		},
		{
			uid: '4',
			sku: 'PD04B50',
			name: 'Motherboard Asus ROG',
			price: '$899.99',
			stock: '12',
			category: 'Gaming',
			status: 'In stock',
		},
		{
			uid: '5',
			sku: 'PD05B60',
			name: 'Mouse Logitech',
			price: '$89.99',
			stock: '75',
			category: 'Peripherals',
			status: 'Sold out',
		},
		{
			uid: '6',
			sku: 'PD06B70',
			name: 'Keyboard Gamer Logitech',
			price: '$299.99',
			stock: '30',
			category: 'Gaming',
			status: 'In stock',
		},
		{
			uid: '7',
			sku: 'PD07B80',
			name: 'Laptop Gamer Asus',
			price: '$599.99',
			stock: '15',
			category: 'Gaming',
			status: 'In stock',
		},
		{
			uid: '8',
			sku: 'PD08B90',
			name: 'SSD NVMe Kingston 1TB',
			price: '$299.99',
			stock: '100',
			category: 'Storage',
			status: 'In stock',
		},
		{
			uid: '9',
			sku: 'PD09B11',
			name: 'Macbook Pro',
			price: '$999.99',
			stock: '30',
			category: 'Computers',
			status: 'In stock',
		},
		{
			uid: '10',
			sku: 'PD10B12',
			name: 'Monitor Gamer Asus 27"',
			price: '$399.99',
			stock: '20',
			category: 'Gaming',
			status: 'In stock',
		},
	];

	return (
		<Grid item xs={12}>
			<DataTable products={products} />
		</Grid>
	);
};

export default Products;
