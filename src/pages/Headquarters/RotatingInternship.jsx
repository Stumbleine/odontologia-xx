import React from 'react';
import Page from '../../components/Page';
import { Container } from '@mui/system';
import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function RotatingInternship() {
	const theme = useTheme();
	return (
		<Page>
			<Container maxWidth="xl" sx={{ pb: 10 }}>
				<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2 }}>
					<Box sx={{ p: 4 }}>
						<Typography
							variant="h3"
							align="center"
							sx={{ fontWeight: 'bold', color: 'text.primary' }}>
							Jefatura
						</Typography>
						<Typography variant="h5" align="center" sx={{ color: 'text.primary', mb: 2 }}>
							Internado Rotatorio
						</Typography>
						<Typography variant="h6" align="center" sx={{ color: 'text.black' }}>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
							ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
							parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
							pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
							pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
							rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
							mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper
							nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
							consequat vitae, eleifend ac, enim. Aliquam
						</Typography>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: '100%', height: 300 }}
						image="imgs/imageMain.png"
						alt="UNSXX"
					/>
				</Card>
				<Card sx={{ mb: 2 }}>
					<Box sx={{ background: theme.palette.auxiliar.main, p: 2 }}>
						<Typography
							align="center"
							variant="h5"
							sx={{ color: 'text.white', fontWeight: 'bolder' }}>
							Noticias
						</Typography>
					</Box>
					{/* noticias */}
					<Box sx={{ py: 2, background: theme.palette.secondary.main }}>asas</Box>
				</Card>
				<Card>
					<Box sx={{ background: theme.palette.primary.main, p: 2 }}>
						<Typography
							align="center"
							variant="h5"
							sx={{ color: 'text.white', fontWeight: 'bolder' }}>
							Planillas públicas
						</Typography>
					</Box>
					{/* noticias */}
					<Box sx={{ py: 2, background: theme.palette.terciary.main }}>asas</Box>
				</Card>
			</Container>
		</Page>
	);
}
