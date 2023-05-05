import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DoughnutChart, LineChart, Widget } from '../components';

const Dashboard = () => {
	const widgets = [
		{
			label: 'Products',
			icon: <Inventory2Icon sx={{ fontSize: '40px' }} />,
			data: '1376',
		},
		{
			label: 'Orders',
			icon: <LocalShippingIcon sx={{ fontSize: '40px' }} />,
			data: '596',
		},
		{
			label: 'Sales',
			icon: <MonetizationOnIcon sx={{ fontSize: '40px' }} />,
			data: "$50'890.543.00",
		},
		{
			label: 'Users',
			icon: <PeopleOutlineIcon sx={{ fontSize: '40px' }} />,
			data: '735',
		},
	];

	return (
		<>
			{widgets.map((item, i) => (
				<Widget key={i} item={item} />
			))}
			<LineChart />
			<DoughnutChart />
		</>
	);
};

export default Dashboard;
