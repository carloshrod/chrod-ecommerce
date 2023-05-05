import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#474c84',
		},
		secondary: {
			main: '#212548',
		},
		success: {
			main: '#11cb5f',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#db2a34',
		},
		text: {
			disabled: '#e4e0e4',
		},
	},
	typography: {
		fontFamily: ['Montserrat', 'Roboto', 'sans-serif'].join(','),
	},
});
