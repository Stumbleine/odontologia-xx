import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export default function NewCard({ newest }) {
	return (
		<Card sx={{ borderRadius: 2, width: 'auto', height: 300, mx: 1 }}>
			<CardMedia
				component="img"
				sx={{ width: 'auto', height: 200 }}
				image={newest?.image}
				alt="new1"
			/>

			<CardContent>
				<Typography
					variant="h6"
					sx={{
						color: 'text.secondary',
						overflow: 'auto',
						whiteSpace: 'normal',
						textOverflow: 'ellipsis',
					}}>
					{newest?.name}
				</Typography>
			</CardContent>
		</Card>
	);
}
