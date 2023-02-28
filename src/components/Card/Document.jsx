import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Icon,
	IconButton,
	SvgIcon,
	Typography,
} from '@mui/material';
import React from 'react';
import { blue, green, grey, purple, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import { FileIcon, extensions } from '../../Utils/extensionsFile';
import { Delete, Download, OpenInNew } from '@mui/icons-material';
import API, { URL } from '../../Utils/Connection';
import fileDownload from 'js-file-download';
import { useDispatch, useSelector } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type';
import DeleteAlert from './DeleteAlert';
import { deleteDocument } from '../../store/DocumentSlice';
import { fireAlert } from '../../Utils/Sweet';
import moment from 'moment';

export default function Document({ doc, onlyRead = false }) {
	const { token, rol } = useSelector(state => state.account);
	const location = useLocation();

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
					<Download />
				</IconButton>
				<IconButton
					onClick={() => {
						window.open(URL + doc?.direccion, '__blank');
					}}>
					<OpenInNew />
				</IconButton>
			</CardActions>
		</Card>
	);
}
