import {
	Card,
	CardActionArea,
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
				background: grey[200],
			}}>
			<CardContent sx={{ p: 1,display:'flex',alignItems:'center' }}>
				<Box>{extensions[`${doc.type}`] || <FileIcon/>}</Box>

				<Box sx={{ pl: 1 }}>
					<Typography  sx={{ textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden' }}>
						{doc.name}
					</Typography>
					<Typography
						noWrap
						variant="body2"
						color={grey[800]}
						sx={{ lineHeight: 1 }}>
						{doc.unidad}
					</Typography>
				</Box>
			</CardContent>
			<CardActionArea
				sx={{
					px: 1,
					display: 'flex',
					justifyContent: 'flex-end',
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
			</CardActionArea>
		</Card>
	);
}
