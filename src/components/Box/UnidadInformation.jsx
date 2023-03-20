import { Box, Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import HeadInformation from './HeadInformation';
import EditUnidadDialog from '../Dialog/EditUnidadDialog';
import { useSelector } from 'react-redux';

export default function UnidadInformation({ unidad, responsable, title, subtitle }) {
	const { isAuth } = useSelector(state => state.auth);
	const { rol, user } = useSelector(state => state.account);
	return (
		<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2, p: 4 }}>
				<Box sx={{ p: 4 }}>
						<Grid container spacing={2}
							>
							<Grid item sx={{ flexGrow: 1 }} xs={12} sm={9}>
								<Typography
									variant="h3"
									sx={{ fontWeight: 'bold', color: 'text.primary' }}>
															{unidad?.nombre || title}
								</Typography>
								<Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
						{subtitle || ''}
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.primary', mr: 1 }}>
						{unidad?.telefonos}
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
						{unidad?.direccion}
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
						{unidad?.descripcion}

						</Typography>
					</Grid>
					<Grid item xs={12} sm={5}>
					<CardMedia
						component="img"
						sx={{ width: '50%', height: 'auto', borderRadius: 2, objectFit: "contain" }}
						
						image={unidad?.cover ? unidad.cover : '/imgs/imageMain.png'}
					/>
					</Grid>
				</Grid>
			{isAuth && rol === 'ADM' && unidad && (
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
					<EditUnidadDialog unidad={unidad} />
				</Box>
			)}
		</Card>
	);
}
