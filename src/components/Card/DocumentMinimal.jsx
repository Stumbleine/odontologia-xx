import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	SvgIcon,
	Typography,
} from '@mui/material';
import React from 'react';

import { blue, green, grey, purple, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { FileIcon, extensions } from '../../Utils/extensionsFile';

export default function DocumentMinimal({ doc }) {
	return (
		<Card
			sx={{
				borderRadius: 1,
				width: '100%',
				p: 1,
				background: grey[200],
				maxWidth: 50,
			}}>
			<Box>{extensions[`${doc.type}`] ||<FileIcon/> }</Box>

			<Typography noWrap>{doc.name}</Typography>
		</Card>
	);
}
