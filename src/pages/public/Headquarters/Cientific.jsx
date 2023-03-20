import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Box, Button, Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import NewsCarousel from '../../../components/NewsCarousel';
import DocumentsGrid from '../../../components/Grid/DocumentsGrid';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeadInformation from '../../../components/Box/HeadInformation';
import { documents } from '../../../Utils/Constants';
import Page from '../../../components/Box/Page';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../../store/NewsSlice';
import { getPublicDocuments } from '../../../store/DocumentSlice';
import API from '../../../Utils/Connection';
import { getResponsable } from '../../../store/UnidadSlice';

export default function Cientific() {
	const theme = useTheme();
	const [responsable, setResponsable] = useState(null);

	const dispatch = useDispatch();

	const [documents, setDocuments] = useState(null);
	const [news, setNews] = useState(null);
	const fetchNews = async () => {
		try {
			const r = await API.get('/public/listar-archivos-publicos?id_unidad=' + 6);
			setDocuments(r.data);
		} catch (e) {
		}
	};

	const fetchDocuments = async () => {
		try {
			const r = await API.get('/public/listar-noticias?id_unidad=' + 6);
			setNews(r.data.data);
		} catch (e) {
		}
	};

	const fetchResponsable = async () => {
		const r = await dispatch(getResponsable(6));
		console.log(r);
		setResponsable(r.data[0]);
	};
	useEffect(() => {
		fetchNews();
		fetchDocuments();
		fetchResponsable();
	}, []);
	// sx={{
	// 	display: 'flex',
	// 	py: 1,
	// }}
	return (
		<Page>
			<Container maxWidth="xl" sx={{ pb: 10 }}>
				<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2 }}>
					<Box sx={{ p: 4 }}>
						<Grid container spacing={2}
							>
							<Grid item sx={{ flexGrow: 1 }} xs={12} sm={9}>
								<Typography
									variant="h3"
									sx={{ fontWeight: 'bold', color: 'text.primary' }}>
									Sociedad cientifica de estudiantes
								</Typography>
								{/* <Typography variant="h5" sx={{ color: 'text.primary', mb: 2 }}>
									Direccion de carrera
								</Typography> */}
							</Grid >
							<Grid item xs={12} sm={3} sx={{
								alignContent:"end"
							}}>
							<HeadInformation head={responsable} />
							</Grid>
						</Grid>
					</Box>
				<Grid container spacing={2}>
				<Grid item xs={12} sm={7} >
						<Typography variant="h6" sx={{ color: 'text.black', textAlign:"justify", paddingLeft:4, paddingRight:3 }}>
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
					</Grid>
					<Grid item xs={12} sm={5}>
					<CardMedia
						component="img"
						sx={{ width: '100%', height: 300 }}
						image="/imgs/imageMain.png"
					/>
					</Grid>
				</Grid>
				</Card>
				<Card sx={{ mb: 2, height:"auto" }}>
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
// <Box
// 	sx={{
// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'flex-end',
// 		mb: 2,
// 	}}>
// 	<Button
// 		variant="contained"
// 		color="auxiliar"
// 		component={Link}
// 		to="/subir-documento"
// 		startIcon={<Add />}>
// 		Documento
// 	</Button>
// </Box>;
