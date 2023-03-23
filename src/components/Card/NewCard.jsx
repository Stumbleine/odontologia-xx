import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import DeleteAlert from './DeleteAlert';
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibilityNew, deleteNew } from '../../store/NewsSlice';
import { OpenInNew, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditNew from '../Dialog/EditNew';
import EditNewFiles from '../Dialog/EditNewFiles';

export default function NewCard({ newest }) {
	const dispatch = useDispatch();
	const { token, rol } = useSelector(state => state.account);

	const deleteFetch = id => {
		const fetch = async () => {
			await dispatch(deleteNew(token, id));
		};
		fetch()
			.then(r => {})
			.catch(e => {});
	};

	const navigate = useNavigate();
	const openNew = () => {
		const route =
			rol === 'guest' ? `/noticias/${newest.id}` : `/panel/noticias/${newest.id}`;

		navigate(route, {
			state: { newest: newest },
		});
	};
	return (
		<Card sx={{ borderRadius: 2, width:"97%", height: 'auto', mx: 1 }}>
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
				{(rol === 'ADM' || rol === 'SUPER') && (
					<>
						<DeleteAlert
							deleteFetch={deleteFetch}
							item={{ name: newest.titulo, type: 'noticia', id: newest.id }}
						/>
						<EditNewFiles newest={newest} />
						<EditNew newest={newest} />
					</>
				)}
				{(rol === 'ADM' || rol === 'SUPER' || rol === 'SCRE') && (
					<Tooltip title={newest?.visible ? 'Ocultar' : 'Mostrar'}>
						<IconButton
							onClick={() => {
								dispatch(
									changeVisibilityNew(token, newest?.id, !newest?.visible || false)
								);
							}}>
							{newest?.visible ?  (
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
							)}
						</IconButton>
					</Tooltip>
				)}
				<IconButton onClick={openNew}>
					<OpenInNew />
				</IconButton>
			</CardActions>
		</Card>
	);
}
