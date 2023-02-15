import React, { useEffect, useState } from 'react';
import Page from '../../../components/Box/Page';
import { Container } from '@mui/system';
import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import NewCard from '../../../components/Card/NewCard';
import NewsCarousel from '../../../components/NewsCarousel';
import DocumentsGrid from '../../../components/Grid/DocumentsGrid';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeadInformation from '../../../components/Box/HeadInformation';
import { documents } from '../../../Utils/Constants';
import { useSelector } from 'react-redux';
import API from '../../../Utils/Connection';

export default function Investigation() {
	const theme = useTheme();
	const head = {
		nombres: 'Dr. Roberto Juan Barrientos Salazar',
		email: 'robertsal.12@gmail.com',
		cargo: 'Jefe de internado rotatorio',
		picture: '/imgs/profileFake.jpg',
	};

	const [documents, setDocuments] = useState(null);
	const [news, setNews] = useState(null);
	const fetchNews = async () => {
		try {
			const r = await API.get('/public/listar-archivos-publicos?id_unidad=' + 2);
			setDocuments(r.data);
		} catch (e) {
			console.log(e);
		}
	};

	const fetchDocuments = async () => {
		try {
			const r = await API.get('/public/listar-noticias?id_unidad=' + 2);
			setNews(r.data);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		fetchNews();
		fetchDocuments();
	}, []);

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
									de Investigación
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
						<NewsCarousel news={news} />
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
						<DocumentsGrid documents={documents} />
					</Box>
				</Card>
			</Container>
		</Page>
	);
}
