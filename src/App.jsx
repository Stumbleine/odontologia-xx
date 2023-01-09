import { ThemeProvider } from '@emotion/react';
import { customTheme } from './theme';
import { CssBaseline } from '@mui/material';
import Router from './routes';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={customTheme}>
				<CssBaseline />
				<Router />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
