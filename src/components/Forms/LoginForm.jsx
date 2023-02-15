import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';
import { Stack } from '@mui/system';
import {
	Box,
	Button,
	Card,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { signin } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => {
		setShowPassword(show => !show);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			email: Yup.string().required('El email es obligatorio'),
			password: Yup.string().required('La contraseña no es válida'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			console.log(values);
			const login = async () => {
				await dispatch(signin(values));
			};
			login()
				.then(r => {
					console.log('Login exitoso');
					resetForm();
					setSubmitting(false);
					navigate('/');
				})
				.catch(e => {
					console.log(e);
					setSubmitting(false);
				});
		},
	});
	const { getFieldProps, values, errors, touched, isSubmitting } = formik;
	return (
		<FormikProvider value={formik}>
			<Form>
				<Stack
					component={Card}
					spacing={2}
					sx={{ p: 2, borderRadius: 2, background: 'white' }}>
					<Box>
						<Typography align="center" sx={{ fontWeight: 'bold' }}>
							¿Eres administrativo?
						</Typography>
						<Typography align="center" sx={{ color: 'text.black' }}>
							Ingresa con tu cuenta
						</Typography>
					</Box>

					<TextField
						fullWidth
						autoComplete="email"
						label="Correo electronico"
						{...getFieldProps('email')}
						helperText={touched.email && errors.email}
						error={Boolean(touched.email && errors.email)}
					/>
					<TextField
						fullWidth
						autoComplete="password"
						label="Contraseña"
						type={showPassword ? 'text' : 'password'}
						{...getFieldProps('password')}
						helperText={touched.password && errors.password}
						error={Boolean(touched.password && errors.password)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleShowPassword}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Box sx={{ pt: 1, position: 'relative' }}>
						<Button
							color="secondary"
							fullWidth
							size="large"
							type="submit"
							disabled={isSubmitting}
							sx={{ fontWeight: 'bold' }}
							variant="contained">
							Ingresar
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
				</Stack>
			</Form>
		</FormikProvider>
	);
}
