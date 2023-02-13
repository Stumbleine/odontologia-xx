import { ArrowBack } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import UploadDocumentForm from '../components/Forms/UploadDocumentForm';
import Page from '../components/Box/Page';
import Back from '../components/Back';

export default function CreateDocument() {
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container maxWidth="sm">
				<Back />
				<UploadDocumentForm />
			</Container>
		</Page>
	);
}
