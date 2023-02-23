import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import {
	Container,
	Grid,
	IconButton,
	Pagination,
	Stack,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import DocumentsGrid from '../../components/Grid/DocumentsGrid';
import API from '../../Utils/Connection';
import { getNews, getPublicNews } from '../../store/NewsSlice';
import { OpenInNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NewContent from '../NewContent';
import NewCard from '../../components/Card/NewCard';
import Msg from '../../components/Box/Msg';

export default function AllNews() {
	const { news } = useSelector(state => state.news);
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
	const count = Math.ceil(20 / 20);
	useEffect(() => {
		const listar = () => {
			dispatch(getPublicNews(token, null, 'all', 'all'));
		};
		listar();
	}, [page]);

	const handlePageActual = (event, value) => {
		dispatch(setPage(parseInt(value) - 1));
	};
	return (
		<Page>
			<Container maxWidth="xl" sx={{ py: 5 }}>
				<Grid container spacing={2}>
					{news?.length > 0 ? (
						news.map(n => {
							return (
								<Grid item xs={12} md={6} key={n.id}>
									<NewCard newest={n} />
								</Grid>
							);
						})
					) : (
						<Msg msg={'No se econtraron noticias.'} />
					)}
				</Grid>
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
