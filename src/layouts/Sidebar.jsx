import { useTheme } from '@emotion/react';
import { Avatar, Box, Drawer, Link, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import LogoSXX from '../components/LogoSXX';

export default function Sidebar({ openSideBar, onCloseSideBar, navlinks }) {
	const theme = useTheme();
	const { pathname } = useLocation();
	//	const { user } = useSelector(state => state.user);
	//	const navlinks = useSelector(state => state.setting.navlinks);
	useEffect(() => {
		if (openSideBar) {
			onCloseSideBar();
		}
	}, [pathname]);
	return (
		<Drawer open={openSideBar} onClose={onCloseSideBar} position="sticky">
			{/* <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', mt: 10 }}>
					<LogoSXX />
				</Box> */}
			{/* <Box sx={{ mb: 5, mx: 2 }}>
				<Link underline="none" component={RouterLink} to="#">
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							p: 2,
							background: theme.palette.background.default,
							borderRadius: 3,
						}}>
						<Avatar src={user.picture} alt="photoURL" />
						<Box
							sx={{
								ml: 2,
							}}>
							<Typography variant="subtitle2" noWrap sx={{ color: 'text.primary' }}>
								{user.nombres + ' ' + user.apellidos}
							</Typography>
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>
								{user?.email}
							</Typography>
						</Box>
					</Box>
				</Link>
			</Box> */}
			{/* contenido */}
			<Box sx={{ px: 2.5, mt: 13 }}>
				{navlinks?.map((nav, index) => (
					<MenuItem
						key={index}
						sx={{
							py: 2,
							px: 2,
							borderRadius: 2,
							color: 'text.terciary',
							fontWeight: 'bold',
						}}
						component={RouterLink}
						to={nav.path}>
						{nav.text}
					</MenuItem>
				))}
			</Box>
		</Drawer>
	);
}
