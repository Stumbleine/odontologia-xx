import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import NewCard from './Card/NewCard';
import Carousel from 'react-material-ui-carousel';
import { Button, Card } from '@mui/material';
export default function NewsCarousel({ news }) {
	const newsCarousel = [];
	// const
	for (let i = 0; i < news?.length; i += 3) {
		const chunk = news.slice(i, i + 3);
		newsCarousel.push(chunk);
	}
	useEffect(() => {
		console.log(news);
	}, [news]);

	let itemsSectioned = [
		[
			{
				name: 'Random Name #1',
				description: 'Probably the most random thing you have ever seen!',
				image: '/imgs/new1.jpg',
			},
			{
				name: 'Random Name #2',
				description: 'Hello World!',
				image: '/imgs/new1.jpg',
			},
			{
				name: 'Random Name #3',
				description: 'Probably the most random thing you have ever seen!',
				image: '/imgs/new1.jpg',
			},
		],
		[
			{
				name: 'Random Name #4',
				description: 'Hello World!',
				image: '/imgs/new1.jpg',
			},
			{
				name: 'Random Name #5',
				description: 'Probably the most random thing you have ever seen!',
				image: '/imgs/new1.jpg',
			},
			{
				name: 'Random Name #6',
				description: 'Hello World!',
				image: '/imgs/new1.jpg',
			},
		],
	];

	return (
		<Carousel autoPlay={true} navButtonsAlwaysVisible={true}>
			{newsCarousel?.map((items, i) => (
				<Box
					key={i}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{items?.map(item => (
						<NewCard key={item.id} newest={item} />
					))}
				</Box>
			))}
		</Carousel>
	);
}
