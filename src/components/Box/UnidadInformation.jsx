import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react';
import HeadInformation from './HeadInformation';
import EditUnidadDialog from '../Dialog/EditUnidadDialog';
import { useSelector } from 'react-redux';

export default function UnidadInformation({ unidad, responsable, title, subtitle }) {
	const { isAuth } = useSelector(state => state.auth);
	const { rol, user } = useSelector(state => state.account);
	return (
		<Card sx={{ background: 'white', borderRadius: 2, mt: 5, mb: 2, p: 4 }}>
			<Box
				sx={{
					display: 'flex',
					py: 1,
				}}>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
						{unidad?.nombre || title}
					</Typography>
					<Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
						{subtitle || ''}
					</Typography>
					{/* <Box sx={{ mb: 1, display: 'flex' }}>
						{unidad?.telefonos?.telefonos.map((tel, index) => (
							<Typography key={index} variant="h6" sx={{ color: 'text.primary', mr: 1 }}>
								{tel}
								{index !== unidad?.telefonos?.telefonos.length - 1 && ' - '}
							</Typography>
						))}
					</Box> */}
					<Typography variant="h6" sx={{ color: 'text.primary', mr: 1 }}>
						{/* {unidad?.telefonos} desconmentar esto despues y quitar lo de abajo */}
						{unidad?.telefonos.telefonos}
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
						{unidad?.direccion}
					</Typography>
				</Box>
				<HeadInformation head={responsable} />
			</Box>
			<Stack direction="row" spacing={2}>
				<CardMedia
					component="img"
					sx={{ width: '50%', height: 'auto', borderRadius: 2 }}
					image={unidad?.cover ? unidad.picture : '/imgs/imageMain.png'}
				/>
				<Typography variant="h6" align="center" sx={{ color: 'text.black' }}>
					{unidad?.descripcion}
				</Typography>
			</Stack>
			{isAuth && rol === 'ADM' && (
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
					<EditUnidadDialog unidad={unidad?.unidad} />
				</Box>
			)}
		</Card>
	);
}
