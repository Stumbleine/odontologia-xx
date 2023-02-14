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
import LogItemDetail from '../Dialog/LogItemDetail';

export default function LogsTable({ logs }) {
	const TABLE_HEAD = [
		{ id: 'typeItem', label: 'Tabla/Modulo' },
		{ id: 'typeAction', label: 'Accion/Comando' },
		{ id: 'fechaRegistro', label: 'Fecha Registro' },
		{ id: 'data', label: 'Dato afectado' },
		{ id: 'user', label: 'Usuario' },
		// { id: 'acciones', label: 'Acciones' },
	];

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
					{logs?.map(log => (
						<TableRow key={log.id} hover>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{log.tipo_item}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{log.tipo_accion}
							</TableCell>

							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{moment(log.fecha).format('LL')}
							</TableCell>
							<TableCell>
								<LogItemDetail data={log.data} />
							</TableCell>
							<TableCell>
								<LogItemDetail data={log.user} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
