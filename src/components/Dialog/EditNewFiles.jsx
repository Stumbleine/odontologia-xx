import { Delete, DriveFileRenameOutlineRounded, Edit, Save } from '@mui/icons-material';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	LinearProgress,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadFiles from '../Forms/UploadFiles';
import { FileIcon, extensions } from '../../Utils/extensionsFile';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { deleteNewFile, updateNewFiles } from '../../store/NewsSlice';
import { fireAlert } from '../../Utils/Sweet';

export default function EditNewFiles({ disabled, newest }) {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.account);
	const [open, setOpen] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [files, setFiles] = useState(null);
	const handleChangeFiles = files => {
		setFiles(files);
	};
	const deleteFetch = idFile => {
		const fetch = async () => {
			await dispatch(deleteNewFile(token, newest.id, idFile));
		};
		fetch()
			.then(r => {
				fireAlert({ title: 'Noticia actualizada exitosamente', icon: 'success' });

				console.log('Archivo eliminada exitosamente.', 'success');
			})
			.catch(e => {
				fireAlert({ title: 'Algo salio mal vuelva a intentarlo', icon: 'error' });
			});
	};

	return (
		<>
			<IconButton disabled={disabled} size="small" onClick={handleClickOpen}>
				<DriveFileRenameOutlineRounded
					sx={{
						color: disabled ? '' : 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				// TransitionComponent={Transition}
			>
				<DialogTitle>{'Editar noticia'}</DialogTitle>

				<DialogContent sx={{ minWidth: 500 }}>
					<Typography sx={{ mb: 1 }}>Archivos:</Typography>
					<Grid container spacing={{ xs: 1 }} sx={{ my: 2 }}>
						{newest.archivos_adjuntos?.map((doc, index) => (
							<Grid
								item
								key={index}
								xs={6}
								sm={6}
								md={4}
								lg={3}
								xl={3}
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}>
								<Card
									sx={{
										borderRadius: 2,
										width: '100%',
										p: 0,
										bgcolor: grey[200],
									}}>
									<CardContent sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
										{extensions[`${doc.type}`] || <FileIcon />}
										<Box
											sx={{
												ml: 1,
												width: '100%',
												overflow: 'hidden',
											}}>
											<Typography
												// fontWeight={600}
												sx={{
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
												}}>
												{doc.nombre}
											</Typography>
										</Box>
									</CardContent>
									<CardActions
										disableSpacing
										sx={{
											// px: 1,
											display: 'flex',
											justifyContent: 'flex-end',
											// background: 'red',s
											p: 0,
										}}>
										<IconButton
											size="small"
											onClick={() => {
												deleteFetch(doc.id);
											}}>
											<Delete />
										</IconButton>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
					<Typography sx={{ mb: 1 }}>Agregar nuevos:</Typography>

					<UploadFiles handleChangeFiles={handleChangeFiles} />
				</DialogContent>
				<CardActions sx={{ display: 'flex', mb: 1.5 }}>
					<Button
						sx={{ color: 'text.primary', mx: 1 }}
						disabled={isSubmitting}
						onClick={handleClose}
						fullWidth
						variant="outlined">
						Cancelar
					</Button>
					{isSubmitting && <LinearProgress />}
					<Button
						sx={{ mx: 1 }}
						disabled={isSubmitting}
						fullWidth
						startIcon={<Save />}
						onClick={() => {
							dispatch(updateNewFiles(token, newest.id, files));
							handleClose();
						}}
						variant="contained">
						Guardar
					</Button>
				</CardActions>
			</Dialog>
		</>
	);
}
