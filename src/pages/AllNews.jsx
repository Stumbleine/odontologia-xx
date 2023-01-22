import React, { useEffect } from 'react';
import Page from '../components/Box/Page';
import { Card, CardActionArea, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import DocumentsGrid from '../components/Grid/DocumentsGrid';
import API from '../Utils/Connection';
import { newsList } from '../store/NewsSlice';
import { OpenInNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function AllNews() {
	const { news } = useSelector(state => state.news);
	const { token } = useSelector(state => state.account);
	const dispatch = useDispatch();
	useEffect(() => {
		const getNews = () => {
			dispatch(newsList(token));
		};
		getNews();
	}, []);

	useEffect(() => {
		console.log('Noticias', news);
	}, [news]);

	return (
		<Page>
			<Container maxWidth="xl" sx={{ py: 10 }}>
				<Grid container spacing={{ xs: 1, lg: 2 }}>
					{news.length > 0 &&
						news.map(n => {
							return (
								<Grid item xs={12} md={6} key={n.id}>
									<Card>
										<CardMedia
											component="img"
											sx={{ width: '100%', height: 300 }}
											image={n.foto}
										/>
										<Box sx={{ flexGrow: 1 }}>
											<Typography
												variant="h3"
												sx={{ fontWeight: 'bold', color: 'text.primary' }}>
												{n.titulo}
											</Typography>
										</Box>
										<DocumentsGrid />
										<CardActionArea>
											<IconButton component={Link} to={`/noticias/${n.id}`}>
												<OpenInNew/>
											</IconButton>
										</CardActionArea>
									</Card>
								</Grid>
							);
						})}
				</Grid>
			</Container>
		</Page>
	);
}
