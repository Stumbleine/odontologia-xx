import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CircularProgress,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { registerUser } from '../../store/UsersSlice';
import API from '../../Utils/Connection';
import Back from '../Back';
import Swal from 'sweetalert2';
import { fireAlert } from '../../Utils/Sweet';

export default function RegisterForm() {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const { token } = useSelector(state => state.account);
	const { unidades } = useSelector(state => state.unidad);

	const handleShowPassword = () => {
		setShowPassword(show => !show);
	};

	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			password: '',
			// rol: '',
			unidad: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required('Los nombres son requeridos'),
			apellidos: Yup.string().required('Los apellidos es requerido'),
			email: Yup.string().required('El correo electronico es requerido'),
			password: Yup.string().required('La contrañesa es requerido'),
			unidad: Yup.string().required('Debe elegir una unidad.'),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const login = async () => {
				await dispatch(registerUser(token, values));
			};
			login()
				.then(r => {
					fireAlert({ title: 'Registro exitoso', icon: 'success' });

					resetForm();
					setSubmitting(false);
				})
				.catch(e => {
					fireAlert({ title: 'Algo salio mal vuelva a intentarlo', icon: 'error' });
					setSubmitting(false);
				});
		},
	});
	const { getFieldProps, handleSubmitvalues, errors, touched, isSubmitting } = formik;
	return (
		<FormikProvider value={formik}>
			<Form>
				<Stack
					// maxWidth="md"
					width={400}
					component={Card}
					spacing={2}
					sx={{ p: 2, borderRadius: 2, background: 'white' }}>
					<Box>
						<Typography variant="h5" align="center" sx={{ color: 'text.black' }}>
							Registrar Usuario Administrador
						</Typography>
					</Box>
					<TextField
						fullWidth
						autoComplete="nombres"
						label="Nombres"
						{...getFieldProps('nombres')}
						helperText={touched.nombres && errors.nombres}
						error={Boolean(touched.nombres && errors.nombres)}
					/>
					<TextField
						fullWidth
						autoComplete="apellidos"
						label="apellidos"
						{...getFieldProps('apellidos')}
						helperText={touched.apellidos && errors.apellidos}
						error={Boolean(touched.apellidos && errors.apellidos)}
					/>
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
					{/* <FormControl fullWidth>
						<InputLabel id="role-label">Rol</InputLabel>
						<Select
							labelId="role-label"
							label="Rol"
							fullWidth
							{...getFieldProps('rol')}
							error={Boolean(touched.rol && errors.rol)}
							inputProps={{}}>
							{rols.map(rol => (
								<MenuItem key={rol.rol} value={rol.rol}>
									{rol.label}
								</MenuItem>
							))}
						</Select>
						<FormHelperText sx={{ color: 'error.main' }}>
							{touched.rol && errors.rol}
						</FormHelperText>
					</FormControl> */}
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

					<Box sx={{ pt: 1, position: 'relative' }}>
						<Button
							color="secondary"
							fullWidth
							size="large"
							type="submit"
							disabled={isSubmitting}
							sx={{ fontWeight: 'bold' }}
							variant="contained">
							Registrar
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
export const rols = [
	{ id_rol: 2, rol: 'administrador', label: 'Administrador' },
	// { id_rol: 1, rol: 'secretaria', label: 'Secretaria' },
	// { id_rol: 1, rol: 'superadministrador', label: 'Super administrador' },
];
