import { Box } from '@mui/material';
import React from 'react';

export default function BackgroundMain({ children }) {
	return (
		<Box
			component="div"
			style={{
				position: 'absolute',
				zIndex: 1,
				backgroundImage: `url("imgs/imageMain.png")`,
				top: 0,
				left: 0,
				width: '100%',
				minHeight: 850,
				objectFit: 'cover',
				opacity: 0.9,
				backgroundRepeat: 'no-repeat',
				filter: 'blur(4px)',
			}}>
			<Box
				sx={{
					background: 'rgba(56, 194, 209, 0.7)',
					position: 'relative',
				}}></Box>
		</Box>
	);
}
