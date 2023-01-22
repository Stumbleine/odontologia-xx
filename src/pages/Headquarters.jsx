import React from 'react';
import Page from '../components/Box/Page';
import BackgroundMain from '../components/BackgroundMain';
import { Container } from '@mui/system';
import { Box, Card, Typography } from '@mui/material';
import AcordionHeadquarter from '../components/AcordionHeadquarter';
// jefaturas
export default function Headquarters() {
	return (
		<Page>
			<Container disableGutters maxWidth="xl">
				<BackgroundMain height={650} />
				<Container
					maxWidth="xl"
					sx={{
						position: 'absolute',
						zIndex: 5,
						mb: 10,
					}}>
					<Box sx={{ pt: 8, background: 'none' }}>
						<Card sx={{ borderRadius: 2, p: 2, maxWidth: 'sm', background: 'white' }}>
							<Typography
								variant="h3"
								align="center"
								sx={{ fontWeight: 'bold', color: 'text.primary' }}>
								Jefaturas
							</Typography>
							<Typography variant="h5" align="center" sx={{ color: 'text.primary' }}>
								Carrera de Odontología
							</Typography>
							<Typography variant="h6" align="center" sx={{ color: 'text.black' }}>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
								ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
								dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
								nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
								Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
								enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
								felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
								elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
								ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
							</Typography>
						</Card>
					</Box>
					<Box sx={{ mt: 15, mb: 10 }}>
						{headquarters.map((head, index) => (
							<AcordionHeadquarter
								key={index}
								name={head.name}
								description={head.description}
								path={head.path}
							/>
						))}
					</Box>
				</Container>
			</Container>
		</Page>
	);
}

const headquarters = [
	{
		name: 'Jefatura de Internado Rotatorio',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam',
		path: '/jefaturas/internado-rotatorio',
	},
	{
		name: 'Jefatura Académica',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam',
		path: '/jefaturas/academica',
	},
	{
		name: 'Jefatura de Extensión',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam',
		path: '/jefaturas/extension',
	},
	{
		name: 'Jefatura de Investigación',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam',
		path: '/jefaturas/investigacion',
	},
	{
		name: 'Jefatura de Clínica',
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam',
		path: '/jefaturas/clinica',
	},
];
