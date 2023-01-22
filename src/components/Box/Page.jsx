import { Height } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import Footer from '../Footer';

export default function Page({ children, settings }) {
	useEffect(() => {
		console.log(settings);
	}, []);

	return (
		<Box
			sx={{
				background: settings?.color || 'none',
				paddingTop: settings?.pt,
				paddingBottom: settings?.pb,
				// background:'blue',
				//	height:'100vh',
				zIndex:0
			}}>
			{children}
			{/* <Footer /> */}
		</Box>
	);
}
