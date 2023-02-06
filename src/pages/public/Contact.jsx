import React from 'react';
import Page from '../../components/Box/Page';
import { Box, Container, Stack } from '@mui/system';
import { Card, Typography } from '@mui/material';
import MapView from '../../components/MapView';

export default function Contact() {
	const contactNumber = '(591)+ 72457625) - 25822420';
	return (
		<Page>
			<Container maxWidth="xl" sx={{ pb: 10 }}>
				<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2, p: 2 }}>
					<Stack>
						<Typography align="center" variant="h3" sx={{ fontWeight: 'bolder' }}>
							Contacto
						</Typography>
						<Typography align="center" variant="h6" sx={{ fontWeight: 'bolder' }}>
							Número de Contacto
						</Typography>
						<Typography align="center" variant="h6" sx={{ color: 'text.black' }}>
							{contactNumber}
						</Typography>
					</Stack>
					<Box sx={{ mt: 2 }}>
						<Typography align="center" variant="h6" sx={{ fontWeight: 'bolder', my: 1 }}>
							Ubicación:
						</Typography>
						<Box
							sx={{
								height: 400,
								width: '100%',
							}}>
							<MapView />
						</Box>
					</Box>
				</Card>
			</Container>
		</Page>
	);
}
