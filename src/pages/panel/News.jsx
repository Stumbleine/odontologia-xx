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
import { getNews } from '../../store/NewsSlice';
import NewCard from '../../components/Card/NewCard';
import Filter from '../../components/Forms/Filter';

export default function News() {
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all' });

	const { news } = useSelector(state => state.news);

	const { token, rol } = useSelector(state => state.account);
	const dispatch = useDispatch();
	useEffect(() => {
		const listar = () => {
			dispatch(getNews(token, null, filter.search, filter.unidad));
		};
		listar();
	}, []);
	const handleUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(getNews(token, null, filter.search, event.target.value));
	};
	const handleSearch = values => {
		setFilter({ ...filter, search: values.search });
		dispatch(getNews(token, null, values.search, filter.unidad));
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
					Noticias
				</Typography>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ mb: 2, justifyContent: 'space-between' }}>
					<Filter handleSearch={handleSearch} handleUnidad={handleUnidad} />
					<Button
						sx={{ width: { xs: '100%', md: 'auto' } }}
						// disabled={disabledBtn}
						component={Link}
						to="/panel/añadir-noticia"
						startIcon={<Add />}
						variant="contained">
						Noticia
					</Button>
				</Stack>
				<Grid container spacing={{ xs: 1 }}>
					{news?.map(n => (
						<Grid item key={n.id} xs={6} md={4} lg={4} xl={3}>
							<NewCard newest={n} />
						</Grid>
					))}
				</Grid>
			</Container>
		</Page>
	);
}
