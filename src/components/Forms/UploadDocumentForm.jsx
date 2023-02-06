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
	const [file, setFile] = useState(null);
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();

	const theme = useTheme();
	const CustomField = styled(TextField)(() => ({
		'& input': {
			paddingLeft: 23,
		},
		'& fieldset': {
			borderRadius: 15,
		},
		color: theme.palette.text.secondary,
	}));

	const [files, setFiles] = useState(null);
	const handleChangeFiles = files => {
		setFiles(files);
	};

	const formik = useFormik({
		initialValues: {
			directory: '',
			unidad: '',
			accesibility: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			directory: Yup.string().required('El nombre de directorio es obligatorio'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, files: files };
			const createNew = async () => {
				await dispatch(createDocument(token, values));
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
					marginTop={2}
					spacing={3}
					sx={{ p: 2, py: 3, borderRadius: 2 }}
					component={Card}
					// divider={<Divider orientation="vertical" flexItem />}
				>
					<Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
						Añadir nuevo documento
					</Typography>
					<TextField
						fullWidth
						label="Accesibilidad"
						variant="outlined"
						{...getFieldProps('accesbility')}
						error={Boolean(touched.accesbility && errors.accesbility)}
						helperText={touched.accesbility && errors.accesbility}
					/>
					<TextField
						fullWidth
						label="Nombre del directorio"
						variant="outlined"
						{...getFieldProps('directory')}
						error={Boolean(touched.directory && errors.directory)}
						helperText={touched.directory && errors.directory}
					/>

					<TextField
						fullWidth
						InputProps={{ style: { borderRadius: 5 } }}
						label="Unidad"
						variant="outlined"
						{...getFieldProps('unidad')}
						error={Boolean(touched.unidad && errors.unidad)}
						helperText={touched.unidad && errors.unidad}
					/>
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
