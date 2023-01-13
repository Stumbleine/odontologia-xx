import { Box } from '@mui/material';
import React from 'react';

export default function Logo({ height }) {
	return (
		<Box
			component="img"
			sx={{ with: 'auto', height: height || 60 }}
			src="imgs/logo.png"
		/>
	);
}
