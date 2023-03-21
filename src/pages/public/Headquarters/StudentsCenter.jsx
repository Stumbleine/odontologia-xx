import { Container } from '@mui/system';
import { Box, Button, Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeadInformation from '../../../components/Box/HeadInformation';
import Page from '../../../components/Box/Page';
import NewsCarousel from '../../../components/NewsCarousel';
import { documents } from '../../../Utils/Constants';
import DocumentsGrid from '../../../components/Grid/DocumentsGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '../../../Utils/Connection';
import { getResponsable } from '../../../store/UnidadSlice';
import UnidadInformation from '../../../components/Box/UnidadInformation';

export default function StudentsCenter() {
	const [documents, setDocuments] = useState(null);
	const [news, setNews] = useState(null);
	const [responsable, setResponsable] = useState(null);
	const theme = useTheme();
	const [unidad, setUnidad] = useState(null);

	const dispatch = useDispatch();
	const fetchNews = async () => {
		try {
			const r = await API.get('/public/listar-archivos-publicos?id_unidad=' + 8);
			setDocuments(r.data);
		} catch (e) {}
	};

	const fetchDocuments = async () => {
		try {
			const r = await API.get('/public/listar-noticias?id_unidad=' + 8);
			setNews(r.data.data);
		} catch (e) {}
	};

	const fetchResponsable = async () => {
		const r = await dispatch(getResponsable(8));
		setResponsable(r.data[0]);
		setUnidad(r.data[1]);
	};

	useEffect(() => {
		fetchNews();
		fetchDocuments();
		fetchResponsable();
	}, []);

	return (
		<Page>
			<Container maxWidth="xl" sx={{ pb: 10 }}>
				<UnidadInformation unidad={unidad} responsable={responsable} />

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
