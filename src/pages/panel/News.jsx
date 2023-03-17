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
	Pagination,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getHideNews, getNews } from '../../store/NewsSlice';
import NewCard from '../../components/Card/NewCard';
import Filter from '../../components/Forms/Filter';

export default function News() {
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all' });
	const [showHideNews, setShowHideNews] = useState(false);
	const { news, total, hideNews } = useSelector(state => state.news);
	const [page, setPage] = useState(0);
	const count = Math.ceil(total / 20);
	const { token, rol } = useSelector(state => state.account);
	const dispatch = useDispatch();
	useEffect(() => {
		const listar = () => {
			dispatch(getNews(token, page, null, filter.search, filter.unidad));
			// dispatch(getHideNews(token,filter.unidad));
		};
		listar();
	}, []);
	const handleUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(getNews(token, page, null, filter.search, event.target.value));
	};
	const handleSearch = values => {
		setFilter({ ...filter, search: values.search });
		dispatch(getNews(token, page, null, values.search, filter.unidad));
	};
	const handlePageActual = (event, value) => {
		setPage(parseInt(value) - 1);
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
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<Button
							sx={{ width: { xs: '100%', md: 'auto' } }}
							// disabled={disabledBtn}
							onClick={() => {
								setShowHideNews(!showHideNews);
							}}
							startIcon={showHideNews ? <Visibility /> : <VisibilityOff />}
							variant="contained">
							{showHideNews ? 'Ver publicos' : 'Ver ocultos'}
						</Button>
						<Button
							sx={{ width: { xs: '100%', md: 'auto' } }}
							component={Link}
							to="/panel/añadir-noticia"
							startIcon={<Add />}
							variant="contained">
							Noticia
						</Button>
					</Stack>
				</Stack>
				{showHideNews ? (
					<Grid container spacing={{ xs: 1 }}>
						{hideNews?.map(n => (
							<Grid item key={n.id} xs={6} md={4} lg={4} xl={3}>
								<NewCard newest={n} />
							</Grid>
						))}
					</Grid>
				) : (
					<Grid container spacing={{ xs: 1 }}>
						{news?.map(n => (
							<Grid item key={n.id} xs={6} md={4} lg={4} xl={3}>
								<NewCard newest={n} />
							</Grid>
						))}
					</Grid>
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
