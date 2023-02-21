import React from 'react';
import Page from '../../components/Box/Page';
import { Container, Typography } from '@mui/material';

export default function Summary() {
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container maxWidth="xl" sx={{}}>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.auxiliar',
					}}>
					Resumen de panel publico
				</Typography>
			</Container>
		</Page>
	);
}
