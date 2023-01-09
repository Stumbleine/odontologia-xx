import { useRoutes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';

export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: <DashboardLayout />,
			children: [
				{
					path: '/',
					element: <Main />,
				},
				{
					path: 'login',
					element: <Login />,
				},
			],
		},
	]);
}
