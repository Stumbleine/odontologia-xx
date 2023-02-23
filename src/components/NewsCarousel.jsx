import { Box } from '@mui/system';
import NewCard from './Card/NewCard';
import Carousel from 'react-material-ui-carousel';
export default function NewsCarousel({ news }) {
	const newsCarousel = [];
	for (let i = 0; i < news?.length; i += 3) {
		const chunk = news.slice(i, i + 3);
		newsCarousel.push(chunk);
	}

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
