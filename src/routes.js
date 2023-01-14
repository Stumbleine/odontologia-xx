import { useRoutes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Headquarters from './pages/Headquarters';
import RotatingInternship from './pages/Headquarters/RotatingInternship';

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
				{
					path: 'acerca-de-la-carrera',
					element: <Login />,
				},
				{
					path: 'direccion-de-carrera',
					element: <Login />,
				},
				{
					path: 'jefaturas',
					element: <Headquarters />,
				},
				{
					path: 'jefaturas/internado-rotatorio',
					element: <RotatingInternship />,
				},
				{
					path: 'jefaturas/académica',
					element: <Headquarters />,
				},
				{
					path: 'jefaturas/extensión',
					element: <Headquarters />,
				},
				{
					path: 'jefaturas/investigación',
					element: <Headquarters />,
				},
				{
					path: 'jefaturas/clinica',
					element: <Headquarters />,
				},

				{
					path: 'recursos',
					element: <Login />,
				},
				{
					path: 'contacto',
					element: <Login />,
				},
			],
		},
	]);
}
