import { ArrowBack } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import UploadDocumentForm from '../components/Forms/UploadDocumentForm';

export default function CreateDocument() {
	return (
		<Container maxWidth="sm">
			<Button component={Link} to="/" startIcon={<ArrowBack></ArrowBack>}>
				Inicio
			</Button>
			<UploadDocumentForm />
		</Container>
	);
}
