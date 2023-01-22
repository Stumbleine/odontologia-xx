import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import Document from '../Card/Document';
import DocumentMinimal from '../Card/DocumentMinimal';
import DirectoriesGrid from './DirectoriesGrid';
import { directories } from '../../Utils/Constants';

export default function DocumentsGrid({ documents, minimal }) {
	const msgDocsNull = () => {
		return (
			<Stack
				// maxWidth="lg"
				width={1}
				spacing={2}
				alignItems="center"
				sx={{ mt: 2 }}>
				<Typography>No se encontraron documentos</Typography>
				<Typography color="textSecondary">
					Intente recargando la pagina nuevamente.
				</Typography>
			</Stack>
		);
	};
	return (
		<>
			<Grid container spacing={{ xs: 1, lg: 2 }}>
				{
					documents
						? documents.map((doc, index) => (
								<Grid
									item
									key={index}
									xs={minimal ? null : 6}
									sm={minimal ? null : 6}
									md={minimal ? null : 4}
									lg={minimal ? null : 3}
									xl={minimal ? null : 3}
									sx={{
										alignItems: 'center',
										display: 'flex',
									}}>
									{minimal ? <DocumentMinimal doc={doc} /> : <Document doc={doc} />}
								</Grid>
						  ))
						: msgDocsNull()
					// : isLoading
					// ? [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((sk, index) => (
					//     <Grid item key={index} xs={6} sm={4} md={3} xl={3}>
					//       <Skeletondoc />
					//     </Grid>
					//   ))
				}
			</Grid>
			<DirectoriesGrid directories={directories}/>
		</>
	);
}
