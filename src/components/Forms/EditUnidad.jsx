import { Image } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUnidad } from '../../store/UnidadSlice';

export default function EditUnidad({ unidad }) {
	const dispatch = useDispatch();

	const [coverImage, setCoverImage] = useState(null);
	const [coverFile, setCoverFile] = useState(null);
	const handleChangeCover = e => {
		setCoverFile(e.target.files);
		setCoverImage(URL.createObjectURL(e.target?.files[0]));
	};

	const formik = useFormik({
		initialValues: {
			id: unidad.id || '',
			nombre: unidad?.nombre || '',
			descripcion: unidad?.descripcion || '',
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
				</Stack>
			</Form>
		</FormikProvider>
	);
}
