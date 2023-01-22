import React from 'react';
import Page from '../components/Box/Page';
import { Box, Container } from '@mui/system';
import { Card, CardMedia, Typography } from '@mui/material';
import DocumentsGrid from '../components/Grid/DocumentsGrid';

export default function NewContent({ data }) {
	return (
		<Page>
			<Container maxWidth="xl" sx={{ py: 10 }}>
				<Card sx={{p:2}}>
					<CardMedia
						component="img"
						sx={{ width: '100%', height: 300 }}
						image={data?.foto}
					/>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
							{data?.titulo}
						</Typography>
						<Typography sx={{ color: 'text.primary', mb: 2 }}>
							{data?.subtitulo}
						</Typography>
					</Box>
					<Typography sx={{ color: 'text.primary', mb: 2 }}>Archivos adjuntos</Typography>
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
						<DocumentsGrid documents={data?.files} minimal={true} />
					</Box>
				</Card>
			</Container>
		</Page>
	);
}
