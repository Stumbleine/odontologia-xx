import { Box } from '@mui/material';
import React from 'react';

export default function BackgroundMain({ height, filter }) {
	return (
		<Box
			component="div"
			style={{
				position: 'absolute',
				zIndex: 1,
				backgroundImage: `url("imgs/sigloxx.jpeg")`,
				left: 0,
				width: '100%',
				height: 'auto',
				minHeight: height || 800,
				objectFit: 'fill',

				backgroundRepeat: 'round',
				filter: 'blur(0px)',
				//	background: 'rgba(56, 194, 209, 0.7)',
			}}>
			{/* <Box
				sx={{
					background: 'rgba(56, 194, 209, 0.7)',
					position: 'relative',
				}}></Box> */}
		</Box>
	);
}
