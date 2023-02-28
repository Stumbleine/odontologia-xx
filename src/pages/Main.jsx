import { Card, CardMedia, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import LoginForm from '../components/Forms/LoginForm';
import BackgroundMain from '../components/BackgroundMain';
import Page from '../components/Box/Page';
import Footer from '../components/Footer';
import LogoSXX from '../components/LogoSXX';
import LogoOdontologia from '../components/LogoOdontologia';

export default function Main() {
	return (
		<>
			<Page settings={{ pt: 0, pb: 10 }}>
				<Container disableGutters maxWidth="xl">
					<BackgroundMain height={650} />
					<Container
						maxWidth="xl"
						sx={{
							position: 'absolute',
							zIndex: 5,
							// alignContent: 'center',
						}}>
						{/* titles */}
						<Stack
							spacing={1}
							sx={{ mb: 30, mt: '15%' }}
							alignItems="center"
							alignContent="center"
							justifyContent="center"
							justifyItems="center">
							<Typography
								variant="h3"
								align="center"
								sx={{
									fontWeight: 'bold',
									fontSize: 60,
									WebkitTextStroke: '2px white',
									color: 'green',
								}}>
								Carrera de Odontología
							</Typography>
							<Typography
								fontWeight="bolder"
								align="center"
								sx={{
									letterSpacing: 1,
									color: 'red',
									fontSize: 35,
									WebkitTextStroke: '1px blue',
								}}>
								UNSXX
							</Typography>
						</Stack>

						<Stack spacing={3} alignItems="center" sx={{ marginTop: 11, mb: 10 }}>
							<Card
								sx={{ borderRadius: 2, display: 'flex', maxWidth: 'lg', maxHeight: 150 }}>
								<CardMedia
									component="img"
									sx={{ width: { xs: 300, md: 'auto' }, height: 300 }}
									image="imgs/imageMain.png"
									alt="UNSXX"
								/>
								<Box sx={{ p: 2 }}>
									<Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
										Antecedentes históricos
									</Typography>
									<Typography sx={{ color: 'text.black' }}>
										Por la inquietud de colegas odontólogos, el Dr. Ángel Abasto Ortiz y
										el Dr. Vladimir Fuentes, quienes solicitaron audiencia al consejo
										académico indicando la necesidad de crear una carrera de
										Odontología...
									</Typography>
								</Box>
							</Card>
							<Stack
								spacing={2}
								direction={{ md: 'row', xs: 'column' }}
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
										conforme a la concepción curricular de la Universidad Nacional “Siglo
										XX”, orientada a la solución de los problemas de salud bucodental y
										socio-sanitarias; para contribuir al mejoramiento de la calidad de
										vida del ser humano.
									</Typography>
								</Card>
								<Card
									sx={{ borderRadius: 2, maxWidth: 'md', bgcolor: 'primary.main', p: 2 }}>
									<Typography
										variant="h6"
										align="center"
										sx={{ fontWeight: 'bold', color: 'white' }}>
										Visión
									</Typography>
									<Typography sx={{ color: 'white' }}>
										La Carrera de Odontología de la Universidad Nacional “Siglo XX”, es
										una unidad académica acreditada a nivel nacional e internacional;
										líder en la formación de profesionales orgánicos e integrales en el
										área de la odontología.
									</Typography>
								</Card>
								<Card
									sx={{ borderRadius: 2, maxWidth: 'md', bgcolor: 'primary.main', p: 2 }}>
									<Typography
										variant="h6"
										align="center"
										sx={{ fontWeight: 'bold', color: 'white' }}>
										Perfil profesional
									</Typography>
									<Typography sx={{ color: 'white' }}>
										El/la Cirujano(a) Odontólogo(a) formado en la Carrera de Odontología
										de la Universidad Nacional “Siglo XX”, será: <br />
										UN PROFESIONAL CON SÓLIDA FORMACIÓN GENERAL, TÉCNICO, CIENTÍFICO Y
										TECNOLÓGICO EN EL EJERCICIO DE LA SALUD BUCO DENTAL, CAPACITADO PARA
										REALIZAR ACCIONES DE DIAGNÓSTICO, PROMOCIÓN, PREVENCIÓN, TRATAMIENTO Y
										REHABILITACIÓN DEL SISTEMA ESTOMATOGNÁTICO DEL INDIVIDUO Y LA
										COMUNIDAD, PROVISTO DE VALORES ÉTICOS Y COMPROMISO CON VISIÓN DE
										TRANSFORMACIÓN SOCIAL.
									</Typography>
								</Card>
							</Stack>
							<Stack
								spacing={1}
								direction={'row'}
								alignContent={'space-around'}
								maxWidth={'lg'}>
								<Card sx={{ borderRadius: 2, maxWidth: 'lg', background: 'white', p: 2 }}>
									<Typography
										variant="h6"
										align="center"
										sx={{ fontWeight: 'bold', color: 'text.black' }}>
										Objetivos especificos
									</Typography>
									<Typography sx={{ color: 'text.black', whiteSpace: 'pre-line' }}>
										Instructivos:
										<ul>
											<li>
												Realizar acciones de promoción, educación, prevención y
												tratamiento de los problemas de la salud bucodental del individuo
												y la comunidad.
											</li>
											<li>
												Caracterizar los principales problemas de la salud buco dental
												considerando los factores biopsicosociales del individuo y la
												comunidad.
											</li>
											<li>
												Desarrollar procesos de diagnóstico y pronóstico para establecer
												un plan de tratamiento con el apoyo de estudios complementarios de
												las patologías bucodentales, del individuo y la comunidad.
											</li>
											<li>
												Aplicar procedimientos clínicos para la atención integral de los
												problemas de salud del sistema estomatognático, tomando en cuenta
												las medidas de bioseguridad y conducta ética.
											</li>
										</ul>
										Educativos:
										<ul>
											<li>
												Participar crítica y reflexivamente en la comprensión y solución
												de los problemas de la salud buco dental.
											</li>
											<li>
												Demostrar responsabilidad, ética y bioética en el desenvolvimiento
												personal y profesional.
											</li>
											<li>
												Utilizar la comunicación en segunda lengua (quechua, aymara o
												inglés) en el contexto de la vida cotidiana y el ejercicio de la
												profesión.
											</li>
											<li>
												Utilizar el método científico como instrumento básico de
												perfeccionamiento para el desarrollo de su profesión.
											</li>
											<li>
												Capacidad de reflexión de la importancia de la transformación
												social en la búsqueda de mejorar las condiciones de vida.
											</li>
											<li>
												Participar activamente en proyectos y programas de la salud
												bucodental en equipos desde una perspectiva multi e
												interdisciplinar.
											</li>
										</ul>
									</Typography>
								</Card>
							</Stack>
							<Stack alignContent="center" alignItems="center">
								<Card sx={{ borderRadius: 2, maxWidth: 'md', background: 'white', p: 2 }}>
									<Typography
										variant="h6"
										align="center"
										sx={{ fontWeight: 'bold', color: 'text.black' }}>
										Organigrama
									</Typography>
									<CardMedia
										component="img"
										image="/imgs/organigrama.jpeg"
										sx={{ width: { xl: 880, md: 600, sm: 530, xs: 420 }, height: 'auto' }}
									/>
								</Card>
							</Stack>
						</Stack>
					</Container>
				</Container>
			</Page>
		</>
	);
}
