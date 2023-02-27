import {
	AppBar,
	Avatar,
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
import { useDispatch, useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import { logout } from '../store/AuthSlice';
export default function Navbar({ onOpenSidebar, navlinks }) {
	const { isAuth } = useSelector(state => state.auth);
	const { user, token } = useSelector(state => state.account);
	const dispatch = useDispatch();
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
						color: active ? 'auxiliar.main' : 'terciary.main',
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
									color: active ? 'auxiliar.main' : 'terciary.main',
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
						color: active ? 'auxiliar.main' : 'terciary.main',
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
						{navlinks?.map((nl, index) => {
							return (
								<>
									{nl.dropdown ? (
										<ItemDropDown
											key={index}
											href={nl.path}
											text={nl.text}
											ddItems={nl.ddItems}
										/>
									) : (
										<ItemNav key={index} href={nl.path} text={nl.text} />
									)}
								</>
							);
						})}
					</Box>
					{!isAuth && (
						<Button
							component={Link}
							to="/login"
							sx={{
								mx: 1,
								color: 'terciary.main',
							}}>
							Ingresar
						</Button>
					)}
					{isAuth && (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}>
							<Button
								onClick={() => dispatch(logout())}
								sx={{
									mx: 1,
									color: 'terciary.main',
								}}>
								Cerrar sesión
							</Button>
							<Box
								sx={{
									p: 1,
									my: 1,
									borderRadius: 3,
									background: grey[200],
									display: 'flex',
									alignItems: 'center',
								}}>
								<Box sx={{ mr: 2 }}>
									<Typography sx={{ fontSize: 15, color: 'text.terciary' }}>
										{user?.nombres}
									</Typography>
									<Typography sx={{ fontSize: 13, color: 'text.terciary' }}>
										{user?.email}
									</Typography>
								</Box>
								<Avatar src={user?.picture} />
							</Box>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
