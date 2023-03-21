import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
export default function AcordionHeadquarter({ name, description, path }) {
	return (
		<Accordion sx={{ borderRadius: 2, mb: 1 }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon sx={{ color: 'text.white' }} />}
				aria-controls="panel1a-content"
				sx={{
					bgcolor: 'primary.main',
					borderRadius: 1,
				}}
				id="panel1a-header">
				<Typography
					align="center"
					fontWeight="bold"
					variant="h6"
					sx={{ color: 'text.white', width: 1 }}>
					{name}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Stack spacing={2} alignItems="center">
					<Typography sx={{ color: 'text.black' }}>{description}</Typography>
					{/* <Box sx={{ height: 60, display: 'flex', justifyContent: 'space-between' }}>
						<Box
							component="img"
							src="imgs/noticias.png"
							sx={{ height: 40, width: 'auto' }}
						/>
						<Box
							component="img"
							src="imgs/files.png"
							sx={{ height: 40, width: 'auto' }}
						/>
					</Box> */}
					<Button variant="contained" component={Link} to={path}>
						Visitar
					</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}
