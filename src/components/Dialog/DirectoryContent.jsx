import {
	Button,
	CardActionArea,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useState } from 'react';
import { OpenInFull, Save } from '@mui/icons-material';
import UploadFiles from '../Forms/UploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilesDirectory } from '../../store/DocumentSlice';
import Document from '../Card/Document';

export default function DirectoryContent({ children, directory, openWithIcon }) {
	const [open, setOpen] = React.useState(false);
	const { token } = useSelector(state => state.account);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	const updateFetch = () => {
		const fetch = async () => {
			await dispatch(updateFilesDirectory(token, files, directory.id));
		};
		fetch()
			.then(r => {})
			.catch(e => {});
	};
	const [files, setFiles] = useState(null);

	const handleChangeFiles = files => {
		setFiles(files);
	};

	return (
		<>
			{openWithIcon ? (
				<IconButton onClick={handleClickOpen}>
					<OpenInFull
						sx={{
							'&:hover': {
								color: 'primary.main',
							},
						}}
					/>
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
				<Box sx={{ px: 2, pt: 2, pb: 2 }}>
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
				<DialogContent sx={{ px: 3, pb: 3, bgcolor: 'terciary.main' }}>
					{/* <DocumentsGrid documents={directory?.archivos} /> */}

					<Grid container spacing={2}>
						{directory?.archivos.map((doc, index) => (
							<Grid
								item
								key={index}
								xl={4}
								xs={12}
								lg={6}
								sx={{
									maxWidth: 200,
									minWidth: 200,
								}}>
								<Document doc={doc} />
							</Grid>
						))}
					</Grid>
					<Box sx={{ mt: 1 }}>
						<Typography>Agregar mas documentos</Typography>
						<UploadFiles handleChangeFiles={handleChangeFiles}>
							<Box sx={{ width: '100%' }}>
								<Button
									// {isSubmitting && <LinearProgress />}
									sx={{ textTransform: 'none' }}
									// disabled={isSubmitting}
									startIcon={<Save />}
									// type="submit"
									onClick={() => {
										updateFetch();
									}}
									fullWidth
									variant="contained">
									Subir
								</Button>
							</Box>
						</UploadFiles>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
}
