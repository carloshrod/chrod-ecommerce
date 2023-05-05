import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

ChartJS.defaults.color = '#e4e0e4';

export const options = {
	responsive: true,
};

const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const data1 = [1023, 341, 15];
const data2 = [100, 234, 453, 873, 934, 344, 1234, 743, 485, 1005, 1345, 2578];

export const data = {
	labels,
	datasets: [
		{
			label: 'Current year',
			data: data1,
			borderColor: 'rgb(17, 203, 95)',
			backgroundColor: 'rgb(17, 203, 95, .5)',
			pointBackgroundColor: '#e4e0e4',
		},
		{
			label: 'Last year',
			data: data2,
			borderColor: 'rgb(71, 76, 132)',
			backgroundColor: 'rgb(71, 76, 132, .5)',
			pointBackgroundColor: '#e4e0e4',
		},
	],
};

const LineChart = () => {
	return (
		<Grid item xs={12} md={6}>
			<Card sx={{ backgroundColor: '#212548', color: '#e4e0e4' }}>
				<CardContent>
					<Typography variant='h5' p={1}>
						Orders by month
					</Typography>
					<Line options={options} data={data} />
				</CardContent>
			</Card>
		</Grid>
	);
};

export default LineChart;
