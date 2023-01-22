import { ArrowBack } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CreateNewForm from '../components/Forms/CreateNewForm';

export default function CreateNew() {
	return (
		<Container maxWidth="md" sx={{ py: 5 }}>
			<Button component={Link} to="/" startIcon={<ArrowBack></ArrowBack>}>
				Inicio
			</Button>
			<CreateNewForm />
		</Container>
	);
}
