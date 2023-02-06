import {
	CardActionArea,
	Dialog,
	DialogContent,
	IconButton,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import DocumentsGrid from '../Grid/DocumentsGrid';
import { OpenInFull } from '@mui/icons-material';

export default function DirectoryContent({ children, directory, openWithIcon }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{openWithIcon ? (
				<IconButton onClick={handleClickOpen}>
					<OpenInFull />
				</IconButton>
			) : (
				<CardActionArea onClick={handleClickOpen}>{children}</CardActionArea>
			)}
			<Dialog
				// sx={{ p: 5, background: 'blue' }}
				maxWidth="xl"
				PaperProps={{
					style: { borderRadius: 15, minWidth: { xs: 400, md: 600, lg: 800, xl: 1200 } },
				}}
				open={open}
				// TransitionComponent={Transition}
				onClose={handleClose}>
				<Box sx={{ px: 3, pt: 3, pb: 2 }}>
					<Typography noWrap variant="h6" fontWeight={600}>
						{directory?.nombre}
					</Typography>
					<Typography fontWeight={600} color="secondary" noWrap>
						{directory?.nombre_unidad}
					</Typography>
					<Typography sx={{ color: 'text.terciary' }} noWrap>
						{directory?.descripciom}
					</Typography>
					<Typography
						noWrap
						variant="subtitle2"
						sx={{ color: 'text.terciary', fontStyle: 'italic' }}>
						subido: {moment(directory?.fecha_creacion).format('LL')}
					</Typography>
				</Box>
				<DialogContent sx={{ px: 5, pb: 5, bgcolor: 'terciary.main' }}>
					<DocumentsGrid documents={directory?.archivos} />
				</DialogContent>
			</Dialog>
		</>
	);
}
