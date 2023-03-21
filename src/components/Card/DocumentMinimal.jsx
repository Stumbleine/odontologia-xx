import {
	Card,
	Typography,
} from '@mui/material';

import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
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
