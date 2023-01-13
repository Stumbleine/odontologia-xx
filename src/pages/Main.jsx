import { Card, CardMedia, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import BackgroundMain from '../components/BackgroundMain';
import Page from '../components/Page';

export default function Main() {
	return (
		<Page settings={{ pt: 0, pb: 10 }}>
			<BackgroundMain />
			<Container
				maxWidth="xl"
				sx={{
					position: 'absolute',
					width: '100%',
					zIndex: 5,
					marginTop: 10,
				}}>
				{/* titles */}
				<Stack
					spacing={1}
					sx={{ mb: 5 }}
					alignItems="center"
					alignContent="center"
					justifyContent="center"
					justifyItems="center">
					<Typography variant="h2" sx={{ fontWeight: 'bold' }}>
						Carrera de Odontología
					</Typography>
					<Typography fontWeight="bolder" sx={{letterSpacing:1}}>UNSXX</Typography>
					<Logo height={150} />
				</Stack>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}>
					<LoginForm />
				</Box>
				<Stack
					spacing={3}
					alignItems="center"
					sx={{ marginTop: 13, mb: 10 }}>
					<Card sx={{ borderRadius: 2, display: 'flex', maxWidth: 'lg', maxHeight: 150 }}>
						<CardMedia
							component="img"
							sx={{ width: 'auto', height: 300 }}
							image="imgs/imageMain.png"
							alt="UNSXX"
						/>
						<Box sx={{ p: 2 }}>
							<Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
								Antecedentes históricos
							</Typography>
							<Typography sx={{ color: 'text.main' }}>
								Por la inquietud de colegas odontólogos, el Dr. Ángel Abasto Ortiz y el
								Dr. Vladimir Fuentes, quienes solicitaron audiencia al consejo académico
								indicando la necesidad de crear una carrera de Odontología...
							</Typography>
						</Box>
					</Card>
					<Stack
						spacing={2}
						direction={'row'}
						alignContent={'space-around'}
						maxWidth={'lg'}>
						<Card
							sx={{
								borderRadius: 2,
								maxWidth: 'md',
								bgcolor: 'primary.main',
								p: 2,
							}}>
							<Typography
								variant="h6"
								align="center"
								sx={{ fontWeight: 'bold', color: 'white' }}>
								Misión
							</Typography>
							<Typography sx={{ color: 'white' }}>
								Formar profesionales orgánicos e idóneos en el área de la odontología,
								conforme a la concepción curricular de la Universidad Siglo XX, orientada
								a la solución de los problemas de salud bucodental y socio-sanitarias;
								para contribuir al mejoramiento de la calidad de vida del ser humano.
							</Typography>
						</Card>
						<Card sx={{ borderRadius: 2, maxWidth: 'md', bgcolor: 'primary.main', p: 2 }}>
							<Typography
								variant="h6"
								align="center"
								sx={{ fontWeight: 'bold', color: 'white' }}>
								Visión
							</Typography>
							<Typography sx={{ color: 'white' }}>
								La Carrera de Odontología de la Universidad Nacional “Siglo XX” es una
								unidad académica acreditada a nivel nacional e internacional; líder en la
								formación de profesionales orgánicos e integrales en el área de la
								odontología.
							</Typography>
						</Card>
						<Card sx={{ borderRadius: 2, maxWidth: 'md', bgcolor: 'primary.main', p: 2 }}>
							<Typography
								variant="h6"
								align="center"
								sx={{ fontWeight: 'bold', color: 'white' }}>
								Objetivos
							</Typography>
							<Typography sx={{ color: 'white' }}>
								Formar cirujanos odontólogos con compromiso social, científicamente
								preparados para coadyuvar en la disminución de las tasas de
								morbimortalidad bucodental a través de una atención integral
							</Typography>
						</Card>
					</Stack>
					<Stack
						spacing={2}
						direction={'row'}
						alignContent={'space-around'}
						maxWidth={'lg'}>
						<Card sx={{ borderRadius: 2, maxWidth: 'md', background:'white', p: 2 }}>
							<Typography
								variant="h6"
								align="center"
								sx={{ fontWeight: 'bold', color: 'text.main' }}>
								Perfil profesional
							</Typography>
							<Typography sx={{ color: 'text.main', whiteSpace: 'pre-line' }}>
								A la conclusión del proceso formativo el Cirujano Odontólogo desempeña
								tareas siguientes: 
								• Prestar atención estomatognática integral en las
								diferentes especialidades odontológicas, en el individuo la familia y la
								comunidad. 
								• Diagnosticar enfermedades bucodentales utilizando
								procedimientos y técnicas en concordancia con las diferentes patologías. 
								• Aplicar métodos científicos, técnicas de la informática y la estadística
								para el análisis e interpretación de los problemas de salud bucodental. 
								• Elaborar proyectos de salud bucodental de acuerdo con las necesidades de
								cada contexto. 
								• Ejecutar funciones administrativas aplicando políticas
								nacionales de salud pública. 
								• Aplicar su formación política e ideológica
								en la vida socio-comunitaria en busca de mejores condiciones de vida. 
								• Establecer una comunicación interpersonal en el idioma originario en
								procesos de atención con el paciente.
							</Typography>
						</Card>
						<Card sx={{ borderRadius: 2, maxWidth: 'md', background:'white', p: 2 }}>
							<Typography
								variant="h6"
								align="center"
								sx={{ fontWeight: 'bold', color: 'text.main' }}>
								Objetivos especificos
							</Typography>
							<Typography sx={{ color: 'text.main',whiteSpace: 'pre-line' }}>
								• Actualizar los programas y planes de estudios de acuerdo con los cambios
								científicos-tecnológicos en el campo de la odontología, aplicando
								políticas que permitan formar profesiones críticas, idóneos, etc. 
								• Fortalecer la investigación y extensión desde un punto de vista
								multidisciplinario cómo único medio de proporcionar alternativas y
								respuestas concretas a la problemática de salud bucal en la región y el
								país. 
								• Disminuir las altas tasas de morbilidad buco dental: caries,
								cardiomiopatías y otras patologías a través de la prevención, promoción,
								educación, diagnóstico, tratamiento del individuo, su familia y la
								comunidad. 
								• Establecer convenios con instituciones gubernamentales y no
								gubernamentales que contribuyan en la formación del futuro profesional
								odontólogo. 
								• Promover el intercambio de actividades odontológicas a nivel
								local, nacional e internacional que permitan una constante socialización
								de planes y programas de estudio.
							</Typography>
						</Card>
					</Stack>
				</Stack>
			</Container>
		</Page>
	);
}
