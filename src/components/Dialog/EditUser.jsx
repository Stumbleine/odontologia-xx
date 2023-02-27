import { Edit } from '@mui/icons-material';
import {
	Button,
	Card,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateUser } from '../../store/UsersSlice';
import { fireAlert } from '../../Utils/Sweet';

export default function EditUser({ user, disabled }) {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.account);
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const formik = useFormik({
		initialValues: {
			nombres: user.nombres,
			apellidos: user.apellidos,
			// email: '',
			unidad: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			nombres: Yup.string().required(),
			apellidos: Yup.string().required(),
			// email: Yup.string().required(),
		}),
		onSubmit: (values, { resetForm, setSubmitting }) => {
			const login = async () => {
				await dispatch(updateUser(token, values, user.id));
			};
			login()
				.then(r => {
					resetForm();
					fireAlert({ title: 'Usuario actualizado exitosamente', icon: 'success' });
					setSubmitting(false);
				})
				.catch(e => {
					console.log(e);
					fireAlert({ title: 'Algo salio mal vuelva a intentarlo', icon: 'error' });
					setSubmitting(false);
				});
		},
	});
	const { errors, touched, handleSubmit, values, getFieldProps, isSubmitting } = formik;
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
				<DialogTitle>{'Editar usuario' + user?.nombres}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<FormikProvider value={formik}>
						<Form>
							<Stack spacing={2} sx={{ borderRadius: 2, background: 'white' }}>
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
								{/* <TextField
									fullWidth
									autoComplete="email"
									label="Correo electronico"
									{...getFieldProps('email')}
									helperText={touched.email && errors.email}
									error={Boolean(touched.email && errors.email)}
								/> */}

								<DialogActions sx={{ p: 0 }}>
									<Button
										sx={{ color: 'primary.main' }}
										variant="outlined"
										color="secondary"
										size="large"
										fullWidth
										onClick={handleClose}>
										Cancelar
									</Button>
									<Box sx={{ position: 'relative', width: '100%' }}>
										<Button
											variant="contained"
											fullWidth
											size="large"
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
				</DialogContent>
			</Dialog>
		</>
	);
}
