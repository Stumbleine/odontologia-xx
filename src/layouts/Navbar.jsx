import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import React from 'react';
import Hamburger from '../assets/burger-solid.svg';
import { Link, useLocation } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import LogoSXX from '../components/LogoSXX';
import { useSelector } from 'react-redux';
export default function Navbar({ onOpenSidebar }) {
	const { isAuth } = useSelector(state => state.auth);
	const { user, token } = useSelector(state => state.account);

	const ItemDropDown = props => {
		const router = useLocation();
		const active = props.href ? router.pathname === props.href : false;
		const [openDrop, setOpenDrop] = React.useState(null);

		const handleOpenDrop = event => {
			setOpenDrop(event.currentTarget);
		};

		const handleMenuItemClick = (event, href) => {
			setOpenDrop(null);
		};

		const handleClose = () => {
			setOpenDrop(null);
		};
		return (
			<>
				<Button
					onClick={handleOpenDrop}
					endIcon={<KeyboardArrowDown />}
					sx={{
						color: active ? 'auxiliar.main' : 'text.disabled',
						fontWeight: 'bold',
						px: 1,
						borderRadius: 1,
					}}>
					{props.text}
				</Button>
				<Menu
					sx={{
						mt: '20px',
						// borderRadius: 10,
					}}
					anchorEl={openDrop}
					open={Boolean(openDrop)}
					keepMounted
					onClose={handleClose}>
					{props?.ddItems.map((menu, index) => {
						const router = useLocation();
						const active = menu.href ? router.pathname === menu.href : false;
						return (
							<MenuItem
								key={index}
								component={Link}
								to={menu.href}
								sx={{
									color: active ? 'auxiliar.main' : 'text.disabled',
									fontWeight: 'bold',
									px: 2.5,
								}}
								onClick={event => handleMenuItemClick(event, menu.href)}>
								{menu.text}
							</MenuItem>
						);
					})}
				</Menu>
			</>
		);
	};

	const ItemNav = props => {
		const router = useLocation();
		const active = props.href ? router.pathname === props.href : false;
		return (
			<>
				<Button
					component={Link}
					to={props.href}
					sx={{
						color: active ? 'auxiliar.main' : 'text.disabled',
						fontWeight: 'bold',
						px: 1,
						borderRadius: 1,
					}}>
					{props.text}
				</Button>
			</>
		);
	};

	return (
		<AppBar
			position="static"
			elevation={1}
			sx={{ zIndex: 'tooltip', background: 'white', position: 'relative' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						component="div"
						sx={{
							mr: {
								xs: 0.5,
								md: 2,
							},
							display: { xs: 'none', md: 'flex' },
						}}>
						<LogoSXX />
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}>
						<IconButton
							aria-controls="menu-appbar"
							size="large"
							aria-haspopup="true"
							onClick={onOpenSidebar}>
							<Box
								component="img"
								src={Hamburger}
								style={{ width: 24, height: 'auto', cplor: '#0072ea' }}
							/>
						</IconButton>
					</Box>
					<Box
						component="div"
						sx={{
							flexGrow: 1,
							p: 1,
							display: {
								xs: 'flex',
								md: 'none',
							},
						}}>
						<LogoSXX />
					</Box>
					<Box
						sx={{
							display: {
								xs: 'none',
								// md: 'flex',
								md: 'flex',
							},
							flexGrow: 1,
						}}>
						<ItemNav href="/" text="Inicio" />
						<ItemNav href="/acerca-de-la-carrera" text="Acerca de la carrera" />
						<ItemNav href="/direccion-de-carrera" text="Dirección de carrera" />
						<ItemDropDown
							href="/jefaturas"
							text="Jefaturas"
							dropdown={true}
							ddItems={ddItems}
						/>
						<ItemNav href="/recursos" text="Recursos virtuales" />
						<ItemNav href="/contacto" text="Contacto" />
						<ItemNav href="/noticias" text="Noticias" />

						{!isAuth &&
							<ItemNav href="/login" text="Ingresar" />}
							{isAuth &&
							<ItemNav href="/users" text="Usuarios" />}

					</Box>
					{
isAuth &&
						<Typography>{user?.nombres + user?.apellidos}</Typography>
					}
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export const ddItems = [
	{
		href: '/jefaturas',
		text: 'Jefaturas',
	},
	{
		href: '/jefaturas/academica',
		text: 'Jefatura académica',
	},
	{
		href: '/jefaturas/extension',
		text: 'Jefatura de extensión',
	},
	{
		href: '/jefaturas/clinica',
		text: 'Jefatura clínica',
	},
	{
		href: '/jefaturas/internado-rotatorio',
		text: 'Jefatura de internado rotatorio',
	},
	{
		href: '/jefaturas/investigacion',
		text: 'Jefatura de investigación',
	},
];
