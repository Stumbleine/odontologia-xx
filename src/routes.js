import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/public/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Headquarters from './pages/public/Headquarters';
import CreateDocument from './pages/CreateDocument';
import Contact from './pages/public/Contact';
import CreateNew from './pages/CreateNew';
import Users from './pages/panel/Users';
import AllNews from './pages/public/AllNews';
import LogoLayout from './layouts/LogoLayout';
import NotFound from './pages/public/NotFound';
import DirectoriesGrid from './components/Grid/DirectoriesGrid';
import { directories, documents } from './Utils/Constants';
import DocumentsGrid from './components/Grid/DocumentsGrid';
import RotatingInternship from './pages/public/Headquarters/RotatingInternship';
import Extension from './pages/public/Headquarters/Extension';
import Academic from './pages/public/Headquarters/Academic';
import Investigation from './pages/public/Headquarters/Investigation';
import Clinic from './pages/public/Headquarters/Clinic';
import Documents from './pages/panel/Documents';
import News from './pages/panel/News';
import Summary from './pages/panel/Summary';
import { getNavlinks, panelNavlinks, publicNavlinks } from './Utils/Navlinks';
import { useSelector } from 'react-redux';
import UserRegister from './pages/panel/UserRegister';
import NewContent from './pages/NewContent';
import CareerDirection from './pages/public/Headquarters/CareerDirection';
import Resources from './pages/public/Resources';
import Logs from './pages/panel/Logs';
import Uegc from './pages/public/Headquarters/Uegc';

export default function Router() {
	const { isAuth } = useSelector(state => state.auth);
	const { rol } = useSelector(state => state.account);

	const router = useLocation();
	console.log(router.pathname);
	const navlinks = getNavlinks(rol);
	return useRoutes([
		{
			path: '/',

			element: !isAuth ? (
				<DashboardLayout navlinks={publicNavlinks} />
			) : (
				<Navigate to="/panel" replace />
			),
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
					path: 'uegc',
					element: <Uegc />,
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
					children: [
						{
							path: 'directory',
							element: <DirectoriesGrid directories={directories} />,
						},
						{
							path: 'directory/archivos',
							element: <DocumentsGrid directories={documents} />,
						},
					],
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
					path: 'users',
					element: <Users />,
				},
				{
					path: 'noticias',
					element: <AllNews />,
				},
				{
					path: 'noticias/:noticia',
					element: <NewContent />,
				},
			],
		},
		{
			path: 'panel',
			element: isAuth ? (
				<DashboardLayout navlinks={navlinks} />
			) : (
				<Navigate to="/" replace />
			),
			children: [
				{ path: '', element: <Main /> },
				{
					path: 'archivos',
					element: <Documents />,
				},
				{ path: 'noticias', element: <News /> },
				{ path: 'noticias/:id', element: <NewContent /> },

				{ path: 'usuarios', element: <Users /> },
				{ path: 'resumen', element: <Summary /> },
				{
					path: 'subir-documento',
					element: <CreateDocument />,
				},
				{
					path: 'añadir-noticia',
					element: <CreateNew />,
				},
				{
					path: 'aniadir-usuario',
					element: <UserRegister />,
				},
				{
					path: 'logs',
					element: <Logs />,
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
