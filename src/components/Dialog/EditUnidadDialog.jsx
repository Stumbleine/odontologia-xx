import { Edit, Image } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditUnidad from '../Forms/EditUnidad';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogTitle,
	Fab,
	TextField,
	Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import { green } from '@mui/material/colors';
import { updateUnidad } from '../../store/UnidadSlice';
export default function EditUnidadDialog({ unidad, disabled }) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [coverImage, setCoverImage] = useState(null);
	const [coverFile, setCoverFile] = useState(null);
	const handleChangeCover = e => {
		setCoverFile(e.target.files);
		setCoverImage(URL.createObjectURL(e.target?.files[0]));
	};

	const formik = useFormik({
		initialValues: {
			id: unidad?.id || '',
			nombre: unidad?.nombre || '',
			descripcion: unidad?.descripcion || '',
			telefonos: unidad?.telefonos || '',
			direccion: unidad?.direccion || '',
			cover: unidad?.cover || '',
		},
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, cover: coverFile };
			const update = async () => {
				await dispatch(updateUnidad(values));
			};
		},
	});
	const {
		values,
		isSubmitting,
		handleChange,
		errors,
		touched,
		handleSubmit,
		getFieldProps,
	} = formik;
	return (
		<>
			<Button
				disabled={disabled}
				onClick={handleClickOpen}
				variant="contained"
				color="auxiliar"
				startIcon={
					<Edit
						sx={{
							color: 'white',
							'&:hover': {
								color: 'auxiliar.main',
							},
						}}
					/>
				}>
				Editar Información
			</Button>
			<Dialog
				PaperProps={{ style: { borderRadius: 15, minWidth: 400 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				// TransitionComponent={Transition}
			>
				<DialogTitle>Editar unidad </DialogTitle>
				<FormikProvider value={Formik}>
					<Form>
						<Stack spacing={2} sx={{ p: 2, borderRadius: 2, background: 'white' }}>
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
							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
										startIcon={<Image />}
										variant="outlined">
										{!coverImage ? 'Subir portada' : 'Cambiar portada'}
									</Button>
								</label>
							</Box>
							<TextField
								fullWidth
								label="Nombre de unidad"
								variant="outlined"
								{...getFieldProps('nombre')}
								error={Boolean(touched.nombre && errors.nombre)}
								helperText={touched.nombre && errors.nombre}
							/>
							<TextField
								fullWidth
								label="Descripcion"
								variant="outlined"
								{...getFieldProps('descripcion')}
								error={Boolean(touched.descripcion && errors.descripcion)}
								helperText={touched.descripcion && errors.descripcion}
							/>
							<TextField
								fullWidth
								label="Telefonos (separe con guiones)"
								placeholder="Ejem: 4 4528733 - 4 4522345 "
								variant="outlined"
								{...getFieldProps('telefonos')}
								error={Boolean(touched.telefonos && errors.telefonos)}
								helperText={touched.telefonos && errors.telefonos}
							/>
							<TextField
								fullWidth
								label="Dirección"
								variant="outlined"
								{...getFieldProps('direccion')}
								error={Boolean(touched.direccion && errors.direccion)}
								helperText={touched.direccion && errors.direccion}
							/>
							<DialogActions sx={{ p: 0 }}>
								<Button
									sx={{ color: 'primary.main', mr: 1 }}
									variant="outlined"
									color="secondary"
									fullWidth
									onClick={handleClose}>
									Cancelar
								</Button>
								<Box sx={{ position: 'relative', width: '100%', ml: 1 }}>
									<Button
										variant="contained"
										fullWidth
										type="submit"
										disabled={isSubmitting}>
										Guardar
									</Button>
									{isSubmitting && (
										<CircularProgress
											size={24}
											sx={{
												color: green[500],
												position: 'absolute',
												top: '50%',
												left: '50%',
												marginTop: '-12px',
												marginLeft: '-12px',
											}}
										/>
									)}
								</Box>
							</DialogActions>
						</Stack>
					</Form>
				</FormikProvider>
			</Dialog>
		</>
	);
}
