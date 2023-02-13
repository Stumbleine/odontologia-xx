import {
	Avatar,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import EditUser from '../Dialog/EditUser';
import DeleteAlert from '../Card/DeleteAlert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../store/UsersSlice';

export default function UsersTable({ users }) {
	const { token } = useSelector(state => state.account);

	const TABLE_HEAD = [
		{ id: 'usuario', label: 'Usuario' },
		{ id: 'role', label: 'Rol' },
		{ id: 'unidad', label: 'Unidad/Jefatura' },
		{ id: 'fechaRegistro', label: 'Fecha Registro' },
		{ id: 'fechActualizacion', label: 'Fecha Actualizacion' },
		{ id: 'acciones', label: 'Acciones' },
	];
	const dispatch = useDispatch();
	const deleteFetch = id => {
		const fetch = async () => {
			await dispatch(deleteUser(token, id));
		};
		fetch()
			.then(r => {
				console.log('usuario eliminada exitosamente.', 'success');
			})
			.catch(e => {
				console.log('usuario salió, vuelva a intentarlo.', 'error');
			});
	};

	return (
		<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
			<Table size="small">
				<TableHead sx={{ bgcolor: 'primary.main' }}>
					<TableRow>
						{TABLE_HEAD.map(col => (
							<TableCell key={col.id} sx={{ color: 'white', py: 1.5 }}>
								<Typography noWrap>{col.label}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{users?.map(user => (
						<TableRow key={user.id} hover>
							<TableCell>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Avatar src={user.picture} sx={{ mr: 1 }} />
									<Box>
										<Typography
											sx={{
												maxWidth: 200,
												whiteSpace: 'nowrap',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												color: 'text.terciary',
											}}>
											{user.nombres + ' ' + user.apellidos}
										</Typography>

										<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
											{user.email}
										</Typography>
									</Box>
								</Box>
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{user.tag_rol === 'ADMIN' && 'Administrador'}
								{user.tag_rol === 'SCRE' && 'Secretaria'}
								{user.tag_rol === 'SUPER' && 'Super Administrador'}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{user.unidad.nombre}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{moment(user.fecha_creacion).format('LL')}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{moment(user.fecha_actualizacion).format('LL')}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}
								align="right">
								{/* <Actions user={user} /> */}
								<Box sx={{ display: 'flex' }}>
									<EditUser user={user} />
									<DeleteAlert
										deleteFetch={deleteFetch}
										item={{ name: user.nombres, type: 'usuario', id: user.id }}
									/>
								</Box>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
