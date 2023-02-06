import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	SvgIcon,
	Typography,
} from '@mui/material';
import React from 'react';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { FileIcon, extensions } from '../../Utils/extensionsFile';
import { Delete, Download, OpenInNew } from '@mui/icons-material';

export default function Document({ doc }) {
	return (
		<Card
			sx={{
				borderRadius: 2,
				width: '100%',
				p: 0,
				bgcolor: grey[200],
			}}>
			<CardContent sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
				<Box>{extensions[`${doc.extension}`] || <FileIcon />}</Box>
				<Box sx={{ pl: 1 }}>
					<Typography
						whiteSpace="normal"
						textOverflow="ellipsis"
						fontWeight={600}
						// sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
					>
						{doc.nombre}
					</Typography>
					<Typography noWrap color="secondary" sx={{ lineHeight: 1 }}>
						{doc.nombre_unidad}
					</Typography>
				</Box>
			</CardContent>
			<CardActions
				disableSpacing
				sx={{
					px: 1,
					display: 'flex',
					justifyContent: 'flex-end',
					// background: 'red',s
					py: 0.5,
				}}
				LinkComponent={Link}
				to="/nuevo-documento">
				<IconButton>
					<OpenInNew />
				</IconButton>
				<IconButton>
					<Delete />
				</IconButton>
				<IconButton>
					<Download />
				</IconButton>
			</CardActions>
		</Card>
	);
}
