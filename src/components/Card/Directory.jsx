import {
	Delete,
	Edit,
	Folder,
	FolderOpen,
	NoteAdd,
	OpenInFull,
} from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Icon,
	IconButton,
	Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import DirectoryContent from '../Dialog/DirectoryContent';
import DeleteAlert from './DeleteAlert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDirectory } from '../../store/DocumentSlice';

export default function Directory({ directory }) {
	const { token, rol } = useSelector(state => state.account);

	const dispatch = useDispatch();
	const deleteFetch = id => {
		const fetch = async () => {
			await dispatch(deleteDirectory(token, id));
		};
		fetch()
			.then(r => {
				console.log('Directorio eliminado exitosamente.', 'success');
			})
			.catch(e => {
				console.log('Algo salió, vuelva a intentarlo.', 'error');
			});
	};
	return (
		<Card sx={{ width: '100%', borderRadius: 2 }}>
			<DirectoryContent directory={directory}>
				<Icon sx={{ width: '100%', bgcolor: 'secondary.main', height: 100 }}>
					<Folder sx={{ fontSize: 100, color: 'terciary.main' }} />
				</Icon>
			</DirectoryContent>
			<CardContent sx={{ pt: 1, pb: 0 }}>
				<Typography noWrap variant="h6" fontWeight={600}>
					{directory?.nombre}
				</Typography>
				<Typography fontWeight={600} color="secondary" noWrap>
					{directory?.nombre_unidad}
				</Typography>
				<Typography sx={{ color: 'text.terciary' }} noWrap>
					{directory?.descripciom}
				</Typography>
				<Typography
					noWrap
					variant="subtitle2"
					sx={{ color: 'text.terciary', fontStyle: 'italic' }}>
					subido: {moment(directory?.fecha_creacion).format('LL')}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
				{rol === 'ADM' && (
					<DeleteAlert
						deleteFetch={deleteFetch}
						item={{ name: directory.nombre, id: directory.id, type: 'directorio' }}
					/>
				)}

				<DirectoryContent openWithIcon={true} directory={directory} />
			</CardActions>
		</Card>
	);
}
