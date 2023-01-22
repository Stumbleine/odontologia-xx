import React from 'react'
import DocumentMinimal from '../Card/DocumentMinimal'
import { Grid, Stack, Typography } from '@mui/material';
import Directory from '../Card/Directory';

export default function DirectoriesGrid({directories}) {
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
    <Grid container spacing={{ xs: 1, lg: 2 }}>
			{
				directories
					? directories.map((dir, index) => (
							<Grid
								item
								key={index}
								xs={ 6}
								sm={ 6}
								md={ 4}
								lg={ 3}
								xl={ 3}
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}>
								 <Directory directory={dir} /> 
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
  )
}
