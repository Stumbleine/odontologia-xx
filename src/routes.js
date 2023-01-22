import { Navigate, useRoutes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Headquarters from './pages/Headquarters';
import RotatingInternship from './pages/Headquarters/RotatingInternship';
import CreateDocument from './pages/CreateDocument';
import Contact from './pages/Contact';
import Academic from './pages/Headquarters/Academic';
import Extension from './pages/Headquarters/Extension';
import Investigation from './pages/Headquarters/Investigation';
import Clinic from './pages/Headquarters/Clinic';
import Resources from './pages/Resources';
import CareerDirection from './pages/CareerDirection';
import AboutCareer from './pages/AboutCareer';
import CreateNew from './pages/CreateNew';
import Users from './pages/Users';
import AllNews from './pages/AllNews';
import LogoLayout from './layouts/LogoLayout';
import NotFound from './pages/NotFound';

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
					element: <AboutCareer />,
				},
				{
					path: 'direccion-de-carrera',
					element: <CareerDirection />,
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
					path: 'jefaturas/academica',
					element: <Academic />,
				},
				{
					path: 'jefaturas/extension',
					element: <Extension />,
				},
				{
					path: 'jefaturas/investigacion',
					element: <Investigation />,
				},
				{
					path: 'jefaturas/clinica',
					element: <Clinic />,
				},

				{
					path: 'recursos',
					element: <Resources />,
				},
				{
					path: 'contacto',
					element: <Contact />,
				},
				{
					path: 'subir-documento',
					element: <CreateDocument />,
				},
				{
					path: 'nueva-noticia',
					element: <CreateNew />,
				},
				{
					path: 'users',
					element: <Users />,
				},
				{
					path: 'noticias',
					element: <AllNews />,
				},
				{
					path: 'noticias/:noticia',
					element: <AllNews />,
				},
			],
		},
		// not found
		{
			path: '/error',
			element: <LogoLayout />,
			children: [
				{ path: '404', element: <NotFound /> },
				{ path: '403', element: <NotFound /> },
				{ path: '*', element: <Navigate to="/error/404" replace /> },
			],
		},
		{ path: '*', element: <Navigate to="/error/404" replace /> },
	]);
}
