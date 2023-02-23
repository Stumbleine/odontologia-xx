import { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import { Container, Pagination, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../components/Forms/Filter';
import { getPublicDocuments } from '../../store/DocumentSlice';
import ResourcesTable from '../../components/Table/ResourcesTable';
import Msg from '../../components/Box/Msg';

export default function Resources() {
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all' });
	const dispatch = useDispatch();
	const { publicDocuments, totalPD } = useSelector(state => state.documents);
	const [page, setPage] = useState(0);
	const count = Math.ceil(totalPD / 20);
	useEffect(() => {
		console.log(totalPD, page);
		dispatch(getPublicDocuments(page, filter.search));
	}, [page]);

	const handleUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(getPublicDocuments(page, filter.search, event.target.value));
	};
	const handleSearch = values => {
		setFilter({ ...filter, search: values.search });
		dispatch(getPublicDocuments(page, values.search, filter.unidad));
	};

	const handlePageActual = (event, value) => {
		dispatch(setPage(parseInt(value) - 1));
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
				{publicDocuments?.length > 0 ? (
					<ResourcesTable resources={publicDocuments} />
				) : (
					<Msg msg={'No se econtraron recursos virtuales.'} />
				)}
				<Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
					<Pagination
						count={count}
						variant="outlined"
						shape="rounded"
						page={parseInt(page) + 1}
						onChange={handlePageActual}
					/>
				</Stack>
			</Container>
		</Page>
	);
}
