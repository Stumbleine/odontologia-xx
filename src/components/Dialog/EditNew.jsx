import { Edit, Save, UploadFile } from '@mui/icons-material';
import {
	Button,
	CardActions,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	LinearProgress,
	TextField,
	Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateNew } from '../../store/NewsSlice';
import { fireAlert } from '../../Utils/Sweet';

export default function EditNew({ newest, disabled }) {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.account);
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [coverImage, setCoverImage] = useState(newest.foto);
	const [coverFile, setCoverFile] = useState(null);
	const handleChangeCover = e => {
		setCoverFile(e.target.files);
		setCoverImage(URL.createObjectURL(e.target?.files[0]));
	};
	// const [files, setFiles] = useState(null);
	// const handleChangeFiles = files => {
	// 	setFiles(files);
	// };
	const formik = useFormik({
		initialValues: {
			id: newest.id,
			title: newest.titulo,
			descripcion: newest.subtitulo,
			// unidad: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required('El titulo es obligatorio'),
			descripcion: Yup.string().required('La descripcion de la noticia es obligatorio'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, cover: coverFile };
			const createNew = async () => {
				await dispatch(updateNew(token, values));
			};

			createNew()
				.then(r => {
					// resetForm();
					handleClose();
					fireAlert({ title: 'Noticia actualizada exitosamente', icon: 'success' });

					setSubmitting(false);
				})
				.catch(e => {
					fireAlert({ title: 'Algo salio mal vuelva a intentarlo', icon: 'error' });

					setSubmitting(false);
				});
			setSubmitting(false);
		},
	});
	const {
		isSubmitting,
		errors,
		touched,
		handleSubmit,
		getFieldProps,
	} = formik;
	return (
		<>
			<IconButton disabled={disabled} size="small" onClick={handleClickOpen}>
				<Edit
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
					<FormikProvider value={formik}>
						<Form onSubmit={handleSubmit}>
							<Stack spacing={2} sx={{ borderRadius: 2 }}>
								<Stack alignItems="flex-end" spacing={1}>
									<Box
										sx={{
											width: '100%',
											height: 160,
											border: !coverImage && 1,
											borderStyle: !coverImage && 'dashed',
											borderRadius: 2,
										}}>
										{coverImage ? (
											<Box
												component="img"
												src={coverImage}
												sx={{
													width: '100%',
													height: '100%',
													background: 'blue',
													objectFit: 'cover',
													borderRadius: 2,
													objectPosition: 'top',
												}}
											/>
										) : (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													width: '100%',
													height: '100%',
												}}>
												<Typography>No se ha subido una portada</Typography>
											</Box>
										)}
									</Box>
									<label htmlFor="cover-image">
										<TextField
											id="cover-image"
											type="file"
											sx={{ display: 'none' }}
											onChange={handleChangeCover}
										/>

										<Button
											component="span"
											sx={{ color: 'text.primary' }}
											startIcon={<UploadFile />}
											variant="outlined">
											{!coverImage ? 'Subir portada' : 'Cambiar portada'}
										</Button>
									</label>
								</Stack>
								<TextField
									fullWidth
									label="Titulo"
									size="small"
									variant="outlined"
									{...getFieldProps('title')}
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title}
								/>
								<TextField
									fullWidth
									multiline
									size="small"
									rows={10}
									label="Descripcion"
									variant="outlined"
									{...getFieldProps('descripcion')}
									error={Boolean(touched.descripcion && errors.descripcion)}
									helperText={touched.descripcion && errors.descripcion}
								/>

								{/* <UploadFiles handleChangeFiles={handleChangeFiles} /> */}
								<CardActions sx={{ display: 'flex', p: 0 }}>
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
										type="submit"
										variant="contained">
										Guardar
									</Button>
								</CardActions>
							</Stack>
						</Form>
					</FormikProvider>
				</DialogContent>
			</Dialog>
		</>
	);
}
