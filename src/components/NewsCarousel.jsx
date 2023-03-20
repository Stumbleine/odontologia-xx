import { Box } from '@mui/system';
import NewCard from './Card/NewCard';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@mui/material';
export default function NewsCarousel({ news }) {
	const newsCarousel = [];
	for (let i = 0; i < news?.length; i += 3) {
		const chunk = news.slice(i, i + 3);
		newsCarousel.push(chunk);
	}

	return (
		<Carousel autoPlay={false} navButtonsAlwaysVisible={true}  fullHeightHover = { false } >
			{newsCarousel?.map((items, i) => (
				<Grid container spacing={3}
					key={i}
					sx={{
						display: 'flex',
			
						flexWrap:"wrap"
					}}>
					{items?.map(item => (
						<Grid sx={{
							width: "100%",
						}} item key={item.id} sm={4} xs={12} >
							<NewCard  newest={item} />
						</Grid>
					))}
				</Grid>
			))}
		</Carousel>
	);
}
