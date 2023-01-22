import React from 'react';
import Page from '../../components/Box/Page';
import { Container } from '@mui/system';
import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import NewCard from '../../components/Card/NewCard';
import NewsCarousel from '../../components/NewsCarousel';
import DocumentsGrid from '../../components/Grid/DocumentsGrid';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeadInformation from '../../components/Box/HeadInformation';
import { documents } from '../../Utils/Constants';

export default function Academic() {
	const theme = useTheme();
	const head = {
		nombres: 'Dr. Roberto Juan Barrientos Salazar',
		email: 'robertsal.12@gmail.com',
		cargo: 'Jefe de internado rotatorio',
		picture: '/imgs/profileFake.jpg',
	};
	return (
		<Page>
			<Container maxWidth="xl" sx={{ pb: 10 }}>
				<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2 }}>
					<Box sx={{ p: 4 }}>
						<Box
							sx={{
								display: 'flex',
								py: 1,
							}}>
							<Box sx={{ flexGrow: 1 }}>
								<Typography
									variant="h3"
									sx={{ fontWeight: 'bold', color: 'text.primary' }}>
									Jefatura
								</Typography>
								<Typography variant="h5" sx={{ color: 'text.primary', mb: 2 }}>
									Internado Rotatorio
								</Typography>
							</Box>
							<HeadInformation head={head} />
						</Box>
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
						image="/imgs/imageMain.png"
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
					<Box
						sx={{
							p: 2,
							background: theme.palette.secondary.main,
						}}>
						<NewsCarousel />
					</Box>
				</Card>
				<Card>
					<Box sx={{ background: theme.palette.primary.main, p: 2 }}>
						<Typography
							align="center"
							variant="h5"
							sx={{ color: 'text.white', fontWeight: 'bolder' }}>
							Documentos
						</Typography>
					</Box>
					{/* noticias */}
					<Box sx={{ p: 2, py: 3, background: theme.palette.terciary.main }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								mb: 2,
							}}>
							<Button
								variant="contained"
								color="auxiliar"
								component={Link}
								to="/subir-documento"
								startIcon={<Add />}>
								Documento
							</Button>
						</Box>
						<DocumentsGrid documents={documents} />
					</Box>
				</Card>
			</Container>
		</Page>
	);
}
