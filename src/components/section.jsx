import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { Children } from 'react';
export default function Section({ imageUrl, bgContainer, title, children }) {
	return (
		<>
			<Box
				sx={{
					position: 'relative',
					background: 'white',
					display: 'flex',
					alignItems: 'end',
				}}>
				<Box
					src={imageUrl}
					component="img"
					alt="slideimage"
					sx={{
						// height: '100%',
						width: '100%',
					}}
				/>
				<Box
					sx={{
						position: 'absolute',
						width: '100%',
						bottom: 0,
					}}>
					<Typography
						style={{ transform: 'rotateX(180deg)' }}
						sx={{
							fontSize: {
								xs: 40,
								sm: 55,
								md: 70,
							},
							lineHeight: 0,
							color: bgContainer,
						}}
						align="center"
						fontWeight="bold">
						EMV
						<Typography
							sx={{
								ml: 1,
								lineHeight: 0.71,
								fontSize: { xs: 40, sm: 55, md: 70 },
								textTransform: 'uppercase',
							}}
							component="span">
							{title}
						</Typography>
					</Typography>
				</Box>
			</Box>

			<Container maxWidth="xl" sx={{ background: bgContainer, height: '50vh' }}>
				<Typography
					sx={{
						fontSize: { xs: 40, sm: 55, md: 70 },
						color: 'white',
						lineHeight: 0.8,
					}}
					gutterBottom
					align="center"
					fontWeight="bold">
					EMV
					<Typography
						sx={{
							ml: 1,
							fontSize: { xs: 40, sm: 55, md: 70 },
							lineHeight: 0,
							textTransform: 'uppercase',
						}}
						component="span">
						{title}
					</Typography>
				</Typography>
				<Box>{children}</Box>
			</Container>
		</>
	);
}
