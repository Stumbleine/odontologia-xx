import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

export default function HeadInformation({ head }) {
	return (
		<Box sx={{ display: 'flex', flexGrow: 0 }}>
			<Stack sx={{ px: 2, textAlign: 'end' }}>
				<Typography fontWeight={600}>{head.nombres}</Typography>
				<Typography>{head.email}</Typography>
				<Typography>{head.cargo}</Typography>
			</Stack>
			<Box
				component="img"
				style={{ height: 100, withd: 100, borderRadius: '10px' }}
				src={head?.picture}
				alt="foto responsable de jefatura"
			/>
		</Box>
	);
}
