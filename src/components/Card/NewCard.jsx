import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import React from 'react';
import DeleteAlert from './DeleteAlert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNew } from '../../store/NewsSlice';
import { OpenInNew } from '@mui/icons-material';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import EditNew from '../Dialog/EditNew';
import EditNewFiles from '../Dialog/EditNewFiles';

export default function NewCard({ newest }) {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.account);

	const deleteFetch = id => {
		const fetch = async () => {
			await dispatch(deleteNew(token, id));
		};
		fetch()
			.then(r => {
				console.log('Archivo eliminada exitosamente.', 'success');
			})
			.catch(e => {
				console.log('Algo salió, vuelva a intentarlo.', 'error');
			});
	};

	const navigate = useNavigate();
	const openNew = () => {
		navigate(`/panel/noticias/${newest.id}`, {
			state: { newest: newest },
		});
	};
	return (
		<Card sx={{ borderRadius: 2, width: 'auto', height: 'auto', mx: 1 }}>
			<CardMedia
				component="img"
				sx={{ width: '100%', height: 140 }}
				image={newest?.foto}
				alt="new1"
			/>

			<CardContent sx={{ p: 1 }}>
				<Typography
					// variant="h6"
					sx={{
						color: 'text.secondary',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						fontWeight: 'bold',

						textOverflow: 'ellipsis',
						lineClamp: 3,
						display: '-webkit-flex',
					}}>
					{newest?.titulo}
				</Typography>
				<Typography
					sx={{
						color: 'text.terciary',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						// height: 50,
						// lineHeight: 1,
						// background: 'blue',
						textOverflow: 'ellipsis',
						lineClamp: 3,
						display: '-webkit-flex',
					}}>
					{newest?.id_unidad}
				</Typography>
			</CardContent>
			<CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
				<DeleteAlert
					deleteFetch={deleteFetch}
					item={{ name: newest.titulo, type: 'noticia', id: newest.id }}
				/>
				<EditNewFiles newest={newest} />
				<EditNew newest={newest} />

				<IconButton onClick={openNew}>
					<OpenInNew />
				</IconButton>
			</CardActions>
		</Card>
	);
}
