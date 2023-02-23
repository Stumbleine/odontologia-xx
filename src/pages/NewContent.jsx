import React from 'react';
import Page from '../components/Box/Page';
import { Box, Container } from '@mui/system';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import DocumentsGrid from '../components/Grid/DocumentsGrid';
import moment from 'moment';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import Back from '../components/Back';

const styles = {
	container: {
		width: '100%',
	},
	floated: {
		float: 'left',
		width: '600px',
		margin: '0px 20px 10px 0px',
	},
};

export default function NewContent() {
	const { state } = useLocation();
	const data = state.newest;
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
					<CardContent sx={{ flexGrow: 1 }}>
						<div style={styles.container}>
							<div style={styles.floated}>
								<img src={data?.foto} alt={data?.titulo} width="600" height="600" />
							</div>
							<Typography
								sx={{
									color: 'text.terciary',
									mb: 2,
									whiteSpace: 'pre-wrap',
									fontSize: 17,
								}}>
								{data?.subtitulo}
							</Typography>
						</div>
						<Typography
							sx={{
								color: 'text.primary',
								// fontWeight: 'bold',
								fontSize: 20,
								textAlign: 'end',
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
								textAlign: 'end',
							}}>
							{moment(data?.fecha_actualizacion).format('LL')}
						</Typography>
					</CardContent>
					<CardActionArea
						disableRipple={true}
						disableTouchRipple={true}
						sx={{ paddingTop: 0, paddingLeft: 2, paddingRight: 2 }}>
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
					</CardActionArea>
				</Card>
			</Container>
		</Page>
	);
}
