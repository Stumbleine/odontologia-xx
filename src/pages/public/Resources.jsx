import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../components/Forms/Filter';
import { getPublicDocuments } from '../../store/DocumentSlice';
import ResourcesTable from '../../components/Table/ResourcesTable';

export default function Resources() {
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all' });
	const dispatch = useDispatch();
	const { publicDocuments } = useSelector(state => state.documents);

	const handleUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(getPublicDocuments(filter.search, event.target.value));
	};
	const handleSearch = values => {
		setFilter({ ...filter, search: values.search });
		dispatch(getPublicDocuments(values.search, filter.unidad));
	};
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
					Recursos virtuales
				</Typography>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ mb: 2, justifyContent: 'space-between' }}>
					<Filter handleSearch={handleSearch} handleUnidad={handleUnidad} />
				</Stack>
				<ResourcesTable resources={publicDocuments} />
			</Container>
		</Page>
	);
}
