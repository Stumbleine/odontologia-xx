import React from 'react';
import Page from '../components/Box/Page';
import { Box, Container } from '@mui/system';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from '@mui/material';
import DocumentsGrid from '../components/Grid/DocumentsGrid';
import moment from 'moment';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import Back from '../components/Back';

export default function NewContent() {
	// const [searchParams] = useSearchParams();
	// const data = JSON.parse(searchParams.get('newest'));
	// console.log(searchParams.get('newest'));
	const { state } = useLocation();
	const data = state.newest;
	console.log('state=>', state);
	const navigate = useNavigate();
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container maxWidth="xl">
				<Back />
				<Card>
					<CardHeader
						title={data?.titulo}
						titleTypographyProps={{ fontWeight: 'bold', fontSize: 27 }}
					/>

					<CardMedia
						component="img"
						sx={{ width: '100%', height: 300 }}
						image={data?.foto}
					/>
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography
							sx={{
								color: 'text.primary',
								// fontWeight: 'bold',
								fontSize: 20,
							}}>
							{data?.id_unidad}
						</Typography>
						<Typography
							sx={{
								color: 'text.secondary',
								mb: 2,
								// fontWeight: 'bold',
								fontStyle: 'italic',
								fontSize: 17,
							}}>
							{moment(data?.fecha_actualizacion).format('LL')}
						</Typography>
						<Typography
							sx={{
								color: 'text.terciary',
								mb: 2,
								whiteSpace: 'pre-wrap',
								fontSize: 20,
							}}>
							{data?.subtitulo}
						</Typography>
						<Typography sx={{ color: 'text.primary', mb: 2, fontSize: 20 }}>
							Archivos adjuntos
						</Typography>
						<Box
							sx={{
								width: '100%',
								height: 'auto',
								minHeight: 150,
								border: 1,
								p: 1,
								borderRadius: 2,
								mb: 1,
							}}>
							<DocumentsGrid documents={data?.archivos_adjuntos} onlyRead={true} />
						</Box>
					</CardContent>
				</Card>
			</Container>
		</Page>
	);
}
