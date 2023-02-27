import { Form, FormikProvider, useFormik } from 'formik';
import {
	Stack,
	TextField,
	Button,
	Alert,
	Snackbar,
	IconButton,
	LinearProgress,
	Typography,
	Card,
	useTheme,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { EmailOutlined, Save, UploadFile } from '@mui/icons-material';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectory, createDocument } from '../../store/DocumentSlice';
import UploadFiles from './UploadFiles';
import { fireAlert } from '../../Utils/Sweet';
import { useNavigate } from 'react-router-dom';

export default function UploadDocumentForm() {
	const { token, user } = useSelector(state => state.account);
	const { unidades } = useSelector(state => state.unidad);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [files, setFiles] = useState(null);
	const handleChangeFiles = files => {
		setFiles(files);
	};

	const formik = useFormik({
		initialValues: {
			directory: '',
			descripcion: '',
			accesibility: 'publico',
			files: '',
			unidad: '',
		},
		enableReinitialize: true,
		validate: values => {
			let errores = {};
			if (files === null) {
				errores.files = 'Debe subir al menos 1 archivo.';
			}
			if (values.accesibility === 'privado' && values.directory === '') {
				errores.directory = 'El nombre del directorio es requerido';
			}
			return errores;
		},
		validationSchema: Yup.object({
			accesibility: Yup.string().required('La accesibilidad es obligatorio'),
			unidad:
				user.tag_rol === 'SUPER'
					? Yup.string().required('Debe elegir una unidad.')
					: Yup.string(),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, files: files };
			const createNew = async () => {
				values.accesibility === 'publico'
					? await dispatch(createDocument(token, values))
					: await dispatch(createDirectory(token, values));
			};

			createNew()
				.then(r => {
					fireAlert({
						title: 'Registro exitoso',
						icon: 'success',
						path: '/panel/archivos',
					});
					setSubmitting(false);
					resetForm();
					setFiles(null);
				})
				.catch(e => {
					fireAlert(
						{ title: 'Algo salio mal vuelva a intentarlo', icon: 'error' },
						navigate
					);
					console.log(e);
					setSubmitting(false);
				});
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
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit}>
				<Stack
					spacing={2}
					sx={{ p: 2, borderRadius: 2 }}
					component={Card}
					// divider={<Divider orientation="vertical" flexItem />}
				>
					<Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
						Añadir nuevo documento
					</Typography>

					<FormControl fullWidth required>
						<InputLabel id="access-label">Accesibilidad</InputLabel>
						<Select
							labelId="access-label"
							label="Accesibilidad"
							required
							defaultValue="publico"
							fullWidth
							// value="publico"
							{...getFieldProps('accesibility')}
							error={Boolean(touched.accesibility && errors.accesibility)}
							inputProps={{}}>
							<MenuItem value="publico">Publico</MenuItem>
							<MenuItem value="privado">Privado</MenuItem>
						</Select>
						<FormHelperText sx={{ color: 'error.main' }}>
							{touched.accesibility && errors.accesibility}
						</FormHelperText>
					</FormControl>
					{user.tag_rol === 'SUPER' ? (
						<FormControl fullWidth>
							<InputLabel id="unidad-label">Unidad</InputLabel>
							<Select
								labelId="unidad-label"
								label="Unidad"
								fullWidth
								{...getFieldProps('unidad')}
								error={Boolean(touched.unidad && errors.unidad)}
								inputProps={{}}>
								{unidades?.map(und => (
									<MenuItem key={und.id} value={und.id}>
										{und.nombre}
									</MenuItem>
								))}
							</Select>
							<FormHelperText sx={{ color: 'error.main' }}>
								{touched.unidad && errors.unidad}
							</FormHelperText>
						</FormControl>
					) : (
						<></>
					)}

					{values.accesibility === 'privado' && (
						<>
							<TextField
								fullWidth
								label="Nombre del directorio"
								variant="outlined"
								{...getFieldProps('directory')}
								required
								error={Boolean(touched.directory && errors.directory)}
								helperText={touched.directory && errors.directory}
							/>
							<TextField
								fullWidth
								required
								label="Descripcion"
								variant="outlined"
								{...getFieldProps('descripcion')}
							/>
						</>
					)}

					<UploadFiles handleChangeFiles={handleChangeFiles} />
					<FormHelperText sx={{ color: 'error.main', ml: 2 }}>
						{touched.files && errors.files}
					</FormHelperText>

					<Box sx={{ width: '100%' }}>
						{isSubmitting && <LinearProgress />}
						<Button
							sx={{ textTransform: 'none' }}
							disabled={isSubmitting}
							startIcon={<Save />}
							type="submit"
							size="large"
							variant="contained"
							fullWidth>
							Subir
						</Button>
					</Box>
				</Stack>
			</Form>
		</FormikProvider>
	);
}
