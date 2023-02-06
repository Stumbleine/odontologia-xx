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

export default function News() {
	const [jefatura, setJefatura] = useState('All');

	const handleJefatura = event => {
		setJefatura(event.target.value);
		// dispatch(filterOffersAsync(accessToken, search, idc, event.target.value));
	};
	const { news } = useSelector(state => state.news);
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();
	useEffect(() => {
		const listar = () => {
			dispatch(getNews(token));
		};
		listar();
	}, []);
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
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ py: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
						<Typography sx={{ mr: 2 }}>Ver noticias de:</Typography>
						<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
							<InputLabel id="label">Jefatura</InputLabel>
							<Select
								labelId="label"
								id="jn-filter"
								defaultValue={'All'}
								onChange={handleJefatura}
								input={<OutlinedInput id="jn-filter" label="Estado" />}>
								<MenuItem value="All">Todos</MenuItem>
								<MenuItem value="VIGENTE">Vigente</MenuItem>
								<MenuItem value="EXPIRADO">Expirado</MenuItem>
							</Select>
						</FormControl>
					</Box>
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
				<Grid container spacing={{ xs: 1, lg: 2 }}>
					{news?.map(n => (
						<NewCard key={n.id} newest={n} />
					))}
				</Grid>
			</Container>
		</Page>
	);
}
