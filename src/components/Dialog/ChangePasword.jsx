import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import API from '../../Utils/Connection';
import { fireAlert } from '../../Utils/Sweet';
import { useDispatch, useSelector } from 'react-redux';
import { changePass } from '../../store/UsersSlice';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Campo requerido'),
  newPassword: Yup.string()
    .required('Campo requerido')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

const ChangePasswordForm = ({ onSubmit }) => {
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

    const handleSubmit =  (values) => {
        dispatch(changePass(token, values));
        handleClose()
      };

    
	const handleClose = () => {
		setOpen(false);
	};
return (
    <>
   <Button
								onClick={() => handleClickOpen()}
								sx={{
									mx: 1,
									color: 'terciary.main',
								}}>
								Cambiar contraseña
							</Button>
    <Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				// TransitionComponent={Transition}
			>
				<DialogTitle>{'Cambiar contraseña'}</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>

                <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="currentPassword"
            as={TextField}
            label="Contraseña actual"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            error={
              touched.currentPassword && Boolean(errors.currentPassword)
            }
            helperText={touched.currentPassword && errors.currentPassword}
          />

          <Field
            name="newPassword"
            as={TextField}
            label="Nueva contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <Field
            name="confirmPassword"
            as={TextField}
            label="Confirmar nueva contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            error={
              touched.confirmPassword && Boolean(errors.confirmPassword)
            }
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <Button
            onClick={() => setShowPassword(!showPassword)}
            variant="contained"
            color="primary"
            sx={{
                marginRight: 2
            }}
          >
            {showPassword ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
          </Button>

          <Button type="submit" variant="contained" color="primary">
            Cambiar contraseña
          </Button>
        </Form>
      )}
    </Formik>
                </DialogContent>
  </Dialog>
    </>)
};

export default ChangePasswordForm;
