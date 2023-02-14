import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Page from '../../components/Box/Page';
import Back from '../../components/Back';

export default function UserRegister() {
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container
				maxWidth="xl"
				sx={{
					// background: 'blue ',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}>
				{/* <Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.auxiliar',
					}}>
					Registrar usuario
				</Typography> */}
				<Box>
					<Back />
					<RegisterForm />
				</Box>
			</Container>
		</Page>
	);
}
