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
import { createDocument } from '../../store/DocumentSlice';
import UploadFiles from './UploadFiles';

export default function UploadDocumentForm() {
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();

	const [files, setFiles] = useState(null);
	const handleChangeFiles = files => {
		setFiles(files);
	};

	const formik = useFormik({
		initialValues: {
			directory: '',
			accesibility: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			accesibility: Yup.string().required('La accesibilidad es obligatorio'),
			// directory: Yup.string().required('El nombre de directorio es obligatorio'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, files: files };
			const createNew = async () => {
				values.accesibility === 'privado'
					? await dispatch(createDocument(token, values))
					: await dispatch(createDocument(token, values));
			};

			createNew()
				.then(r => {
					console.log('Registro de noticia exitoso');
					resetForm();
					setSubmitting(false);
				})
				.catch(e => {
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

					<FormControl fullWidth>
						<InputLabel id="access-label">Accesibilidad</InputLabel>
						<Select
							labelId="access-label"
							label="Accesibilidad"
							defaultValue="publico"
							fullWidth
							{...getFieldProps('accesibility')}
							error={Boolean(touched.rol && errors.rol)}
							inputProps={{}}>
							<MenuItem value="publico">Publico</MenuItem>
							<MenuItem value="privado">Privado</MenuItem>
						</Select>
						<FormHelperText sx={{ color: 'error.main' }}>
							{touched.accesibility && errors.accesibility}
						</FormHelperText>
					</FormControl>
					{values.accesibility === 'privado' && (
						<TextField
							fullWidth
							label="Nombre del directorio"
							variant="outlined"
							{...getFieldProps('directory')}
							error={Boolean(touched.directory && errors.directory)}
							helperText={touched.directory && errors.directory}
						/>
					)}

					<UploadFiles handleChangeFiles={handleChangeFiles} />

					<Box sx={{ width: '100%' }}>
						{isSubmitting && <LinearProgress />}
						<Button
							sx={{ textTransform: 'none' }}
							disabled={isSubmitting}
							startIcon={<Save />}
							onClick={() => {
								console.log(values);
							}}
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
