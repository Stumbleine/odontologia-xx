import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import Page from '../../components/Box/Page';

export default function UserRegister() {
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container maxWidth="xl" sx={{}}>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.auxiliar',
					}}>
					Registrar usuario
				</Typography>
				<RegisterForm />
			</Container>
		</Page>
	);
}
