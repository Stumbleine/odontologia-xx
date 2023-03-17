import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import LogoSXX from '../../components/LogoSXX';

export default function NotFound() {
	return (
		<Container maxWidth="xl" sx={{ pt: 20 }}>
			{/* <Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
				<LogoSXX />
			</Box> */}
			<Typography align="center" variant="h1" color="secondary" fontWeight="bold">
				Error 404
			</Typography>
			<Typography align="center" fontWeight="bold" variant="h3" color="terciary">
				Pagina no encontrada
			</Typography>
		</Container>
	);
}
