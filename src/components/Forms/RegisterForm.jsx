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

export default function RegisterForm() {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
    const {token} = useSelector(state=>state.account)
	const handleShowPassword = () => {
		setShowPassword(show => !show);
	};
    const [entities, setEntities] = useState(null)

    useEffect(() => {
      const getEntities= async ()=>{
        console.log(token)
        try {
            const r = await API.get('unidad/listar',{
            headers: { Authorization: `Bearer ${token}` },
            });
            setEntities(r.data)
            console.log(r.data,'unidades')
        }catch(e){
		throw new Error(e); 

        }
    }
    getEntities()
    }, [])
    
	const formik = useFormik({
		initialValues: {
			nombres: '',
			apellidos: '',
			email: '',
			password: '',
            rol:'',
            unidad:''
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required(),
			apellidos: Yup.string().required(),
			email: Yup.string().required(),
			password: Yup.string().required(),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			console.log(values);
			const login = async () => {
				await dispatch(registerUser(token,values));
			};
			login()
				.then(r => {
					console.log('Login exitoso');
					resetForm();
					setSubmitting(false);
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
                maxWidth="sm"
					component={Card}
					spacing={2}
					sx={{ p: 2, borderRadius: 2, background: 'white' }}>
					<Box>
						<Typography align="center" sx={{ color: 'text.black' }}>
							Registrar usuario
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
						<FormControl fullWidth size="small">
							<InputLabel id="role-label">Rol</InputLabel>
							<Select
								labelId="role-label"
								label="Rol"
								fullWidth
								{...getFieldProps('rol')}
								error={Boolean(touched.rol && errors.rol)}
								size="small"
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
						</FormControl>
                        <FormControl fullWidth size="small">
							<InputLabel id="unidad-label">Unidad</InputLabel>
							<Select
								labelId="unidad-label"
								label="Unidad"
								fullWidth
								{...getFieldProps('unidad')}
								error={Boolean(touched.unidad && errors.unidad)}
								size="small"
								inputProps={{}}>
								{entities?.map(e => (
									<MenuItem key={e.id} value={e.id}>
										{e.nombre}
									</MenuItem>
								))}
							</Select>
							<FormHelperText sx={{ color: 'error.main' }}>
								{touched.rol && errors.rol}
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
export const rols = [
	{ id_rol: 2, rol: 'admin', label: 'Administrador' },
	{ id_rol: 1, rol: 'secretaria', label: 'Secretaria' },
];