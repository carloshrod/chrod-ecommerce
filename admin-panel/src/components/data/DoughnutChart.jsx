import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
	responsive: true,
};

export const data = {
	labels: ['Computers', 'Gaming', 'Electronics', 'Software', 'Video', 'Audio'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(17, 203, 95, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(219, 42, 52, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(228, 224, 228, 0.2)',
			],
			borderColor: [
				'rgba(17, 203, 95, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(219, 42, 52, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(228, 224, 228, 1)',
			],
			borderWidth: 1,
		},
	],
};

const DoughnutChart = () => {
	return (
		<Grid item xs={12} md={6}>
			<Card sx={{ backgroundColor: '#212548', color: '#e4e0e4' }}>
				<CardContent>
					<Typography variant='h5' p={1}>
						Sales by category
					</Typography>
					<Doughnut data={data} />
				</CardContent>
			</Card>
		</Grid>
	);
};

export default DoughnutChart;
