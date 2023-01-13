import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';

export default function Page({ children, settings }) {
	useEffect(() => {
		console.log(settings);
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: settings?.color || 'none',
				paddingTop: settings?.pt,
				paddingBottom: settings?.pb,
			}}>
			{children}
		</Box>
	);
}
