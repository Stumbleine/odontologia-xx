import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Back() {
	const navigate = useNavigate();

	return (
		<Box sx={{ mb: 2 }}>
			<Button
				variant="outlined"
				sx={{ color: 'primary.main' }}
				onClick={() => navigate(-1)}
				startIcon={<ArrowBack></ArrowBack>}>
				Volver
			</Button>
		</Box>
	);
}
