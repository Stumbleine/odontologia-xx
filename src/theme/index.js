import { createTheme } from '@mui/material/styles';
import { grey, orange, red, blue } from '@mui/material/colors';
import ComponentsOverrides from './ComponentsOverrides';

export const customTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#38AFD1',
		},
		secondary: {
			main: '#388A9C',
		},
		terciary: {
			main: '#123F4B',
		},
		auxiliar: {
			main: '#F17D28',
		},
		background: {
			paper: '#fff',
			default: '#F4F4F4',
		},
		text: {
			black: '#000000',
			white: '#fff',
			primary: '#38AFD1',
			secondary: '#388A9C',
			terciary: '#123F4B',
			auxiliar: '#F17D28',
			disabled: 'rgba(0,0,0,0.6)',
			icon: '#F17D28',
		},
		warning: {
			main: orange[800],
			light: orange[500],
		},
		error: {
			main: red[700],
			light: red[400],
			delete: red[200],
		},
	},
	typography: {
		fontFamily: "'Raleway', sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
});

customTheme.components = ComponentsOverrides(customTheme);
