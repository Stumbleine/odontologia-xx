import React from 'react';
import LoginForm from '../components/Forms/LoginForm';
import { Container } from '@mui/system';
import Page from '../components/Box/Page';

export default function Login() {
	return (
		<Page>
			<Container maxWidth="sm" sx={{ py: 10 }}>
				<LoginForm />
			</Container>
		</Page>
	);
}
