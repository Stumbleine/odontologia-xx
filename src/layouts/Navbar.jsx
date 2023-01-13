import { AppBar, Box, Button, Container, Icon, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import Hamburger from '../assets/burger-solid.svg';
import Logo from '../components/Logo';
import { NavLink, useLocation } from 'react-router-dom';
export default function Navbar({ onOpenSidebar }) {
	const ItemNav = props => {
		const router = useLocation();
		const active = props.href ? router.pathname === props.href : false;
		return (
			<>
				<NavLink to={props.href} style={{ textDecoration: 'none' }}>
					<Button
						sx={{
							color: active ? 'primary.main' : 'text.disabled',
							fontWeight: 'bold',
							px: 0.5,
						}}>
						{props.text}
					</Button>
				</NavLink>
			</>
		);
	};
	return (
		<AppBar
			position="static"
			elevation={1}
			sx={{ zIndex: 'tooltip', background: 'white',position:'relative' }}>
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
						<Logo />
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
						<Logo />
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
						<ItemNav href="/jefaturas" text="Jefaturas" />
						<ItemNav href="/recursos" text="Recursos virtuales" />
						<ItemNav href="/contacto" text="Contacto" />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
