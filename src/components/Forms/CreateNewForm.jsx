import { Form, FormikProvider, useFormik } from 'formik';
import {
	Stack,
	TextField,
	Button,
	LinearProgress,
	Typography,
	Card,
	useTheme,
	CardActionArea,
	CardActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { Add, Preview, Publish, Save, UploadFile } from '@mui/icons-material';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import { Editor } from '@tinymce/tinymce-react';
import DocumentsGrid from '../Grid/DocumentsGrid';
import { documents } from '../../Utils/Constants';
import UploadFiles from './UploadFiles';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../store/NewsSlice';
import { fireAlert } from '../../Utils/Sweet';
import { useNavigate } from 'react-router-dom';

export default function CreateNewForm() {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.account);
	const navigate = useNavigate();

	// const theme = useTheme();
	// const CustomField = styled(TextField)(() => ({
	// 	'& input': {
	// 		paddingLeft: 23,
	// 	},
	// 	'& fieldset': {
	// 		borderRadius: 15,
	// 	},
	// 	color: theme.palette.text.secondary,
	// }));
	// cover image
	const [coverImage, setCoverImage] = useState(null);
	const [coverFile, setCoverFile] = useState(null);
	const handleChangeCover = e => {
		setCoverFile(e.target.files);
		setCoverImage(URL.createObjectURL(e.target?.files[0]));
	};
	const [files, setFiles] = useState(null);
	const handleChangeFiles = files => {
		setFiles(files);
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			descripcion: '',
			// unidad: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required('El titulo es obligatorio'),
			descripcion: Yup.string().required('La descripcion de la noticia es obligatorio'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			values = { ...values, cover: coverFile, files: files };
			const createNew = async () => {
				await dispatch(create(token, values));
			};

			createNew()
				.then(r => {
					console.log('Registro de noticia exitoso');
					resetForm();
					setSubmitting(false);
					fireAlert({ title: 'Registro exitoso', icon: 'success' });
				})
				.catch(e => {
					console.log(e);
					setSubmitting(false);
					fireAlert({ title: 'Algo salio mal vuelva a intentarlo', icon: 'warning' });
				});
			setSubmitting(false);
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

	useEffect(() => {
		console.log('files in form=>', files);
	}, [files]);
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit}>
				<Stack spacing={2} sx={{ p: 2, borderRadius: 2 }} component={Card}>
					<Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
						Crear noticia
					</Typography>
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
						variant="outlined"
						{...getFieldProps('title')}
						error={Boolean(touched.title && errors.title)}
						helperText={touched.title && errors.title}
					/>
					<TextField
						fullWidth
						multiline
						rows={10}
						label="Descripcion"
						variant="outlined"
						{...getFieldProps('descripcion')}
						error={Boolean(touched.descripcion && errors.descripcion)}
						helperText={touched.descripcion && errors.descripcion}
					/>

					<UploadFiles handleChangeFiles={handleChangeFiles} />
					<CardActions sx={{ display: 'flex' }}>
						<Button
							sx={{ color: 'text.primary', mx: 1 }}
							disabled={isSubmitting}
							fullWidth
							onClick={() => navigate(-1)}
							variant="outlined">
							Cancelar
						</Button>
						{isSubmitting && <LinearProgress />}
						<Button
							sx={{ mx: 1 }}
							disabled={isSubmitting}
							fullWidth
							startIcon={<Publish />}
							type="submit"
							variant="contained">
							Publicar
						</Button>
					</CardActions>
				</Stack>
			</Form>
		</FormikProvider>
	);
}

/*
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};
					<Editor
						onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue="<p>This is the initial content of the editor.</p>"
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style:
								'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
					/>
					<button onClick={log}>Log editor content</button>

*/
