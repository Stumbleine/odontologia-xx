import { ThemeProvider } from '@emotion/react';
import { customTheme } from './theme';
import { CssBaseline } from '@mui/material';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
function App() {
	moment.locale('es');
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
