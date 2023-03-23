import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import { grey} from '@mui/material/colors';
import { Box } from '@mui/system';
import { FileIcon, extensions } from '../../Utils/extensionsFile';
import {
	Download,
	OpenInNew,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import API, { URL } from '../../Utils/Connection';
import fileDownload from 'js-file-download';
import { useDispatch, useSelector } from 'react-redux';
import DeleteAlert from './DeleteAlert';
import { changeVisibilityDocument, deleteDocument } from '../../store/DocumentSlice';
import moment from 'moment';

export default function Document({ doc, onlyRead = false, isPublic }) {
	const { token, rol } = useSelector(state => state.account);

	const handleDownload = () => {
		API.get('/archivo-privado/obtener-archivo?id=' + doc.id, {
			headers: { Authorization: `Bearer ${token}` },
			responseType: 'blob',
		}).then(res => {
			fileDownload(res.data, doc.nombre + '.' + doc.extension);
		});
	};
	const handleDownloadPublic = () => {
		API.get('/public/obtener-archivo?id=' + doc.id, {
			headers: { Authorization: `Bearer ${token}` },
			responseType: 'blob',
		}).then(res => {
			fileDownload(res.data, doc.nombre + '.' + doc.extension);
		});
	};

	const dispatch = useDispatch();
	const deleteFetch = id => {
		const fetch = async () => {
			await dispatch(deleteDocument(token, id));
		};
		fetch()
			.then(r => {
				// fireAlert({ title: 'Archivo eliminado correctamente', icon: 'success' });
			})
			.catch(e => {
				// fireAlert({ title: 'Algo salió mal, vuelva a intentarlo', icon: 'error' });
			});
	};
	return (
		<Card
			sx={{
				borderRadius: 2,
				width: '100%',
				p: 0,
				bgcolor: grey[200],
			}}>
			<CardContent sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
				{extensions[`${doc.type}`] || <FileIcon />}
				<Box
					sx={{
						ml: 1,
						width: '100%',
						overflow: 'hidden',
					}}>
					<Typography
						fontWeight={600}
						sx={{
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
						}}>
						{doc.nombre}
					</Typography>

					<Typography noWrap color="secondary" sx={{ lineHeight: 1 }}>
						{moment(doc.fecha_creacion).format('LL')}
					</Typography>
				</Box>
			</CardContent>
			<CardActions
				disableSpacing
				sx={{
					px: 1,
					display: 'flex',
					justifyContent: 'flex-end',
					// background: 'red',s
					py: 0.5,
				}}>
				{isPublic &&
					(rol ===
						'ADM' || rol === "SUPER" || rol === "SCRE") &&(
							<Tooltip title={doc?.visible ? 'Ocultar' : 'Mostrar'}>
								<IconButton
									onClick={() => {
										dispatch(
											changeVisibilityDocument(
												token,
												doc?.id,
												!doc?.visible || false
											)
										);
									}}>
									{doc?.visible ?(
										<VisibilityOff
											sx={{
												'&:hover': {
													color: 'primary.main',
												},
											}}
										/>
									): (
										<Visibility
											sx={{
												'&:hover': {
													color: 'primary.light',
												},
											}}
										/>
									) }
								</IconButton>
							</Tooltip>
						)}
				{(rol === 'ADM' || rol === 'SUPER') && onlyRead === false && (
					<DeleteAlert
						item={{ name: doc.nombre, type: 'archivo', id: doc.id }}
						deleteFetch={deleteFetch}
					/>
				)}
				<IconButton
					onClick={() => {
						if (
							doc.direccion.includes('/uploads/noticia') ||
							doc.direccion.includes('/uploads/public')
						) {
							handleDownloadPublic();
						} else {
							handleDownload();
						}
					}}>
					<Download
						sx={{
							'&:hover': {
								color: 'primary.main',
							},
						}}
					/>
				</IconButton>
				<IconButton
					onClick={() => {
						window.open(URL + doc?.direccion, '__blank');
					}}>
					<OpenInNew
						sx={{
							'&:hover': {
								color: 'primary.main',
							},
						}}
					/>
				</IconButton>
			</CardActions>
		</Card>
	);
}
