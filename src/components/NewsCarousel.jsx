import { Box } from '@mui/system';
import React from 'react';
import NewCard from './Card/NewCard';
import Carousel from 'react-material-ui-carousel';
import { Button, Card } from '@mui/material';
export default function NewsCarousel() {
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
			{itemsSectioned.map((items, i) => (
				<Box
					key={i}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{items.map(item => (
						<NewCard key={item.name} newest={item} />
					))}
				</Box>
			))}
		</Carousel>
	);
}
