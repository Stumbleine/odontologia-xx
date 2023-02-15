import {
	Avatar,
	IconButton,
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
import { Download, OpenInNew } from '@mui/icons-material';
import fileDownload from 'js-file-download';
import API, { URL } from '../../Utils/Connection';
import { FileIcon, extensions } from '../../Utils/extensionsFile';

export default function ResourcesTable({ resources }) {
	const { token } = useSelector(state => state.account);

	const TABLE_HEAD = [
		{ id: 'nombres', label: 'Archivo' },
		{ id: 'unidad', label: 'Unidad/Jefatura' },
		{ id: 'fechaSubido', label: 'Fecha de subida' },
		{ id: 'acciones', label: 'Acciones' },
	];
	const handleDownload = doc => {
		API.get('/archivo-privado/obtener-archivo?id=' + doc.id, {
			headers: { Authorization: `Bearer ${token}` },
			responseType: 'blob',
		}).then(res => {
			fileDownload(res.data, doc.nombre + '.' + doc.extension);
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
					{resources?.map(doc => (
						<TableRow key={doc.id} hover>
							<TableCell>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{extensions[`${doc.type}`] || <FileIcon />}
									<Box sx={{ ml: 1 }}>
										<Typography
											sx={{
												maxWidth: 200,
												whiteSpace: 'nowrap',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												color: 'text.terciary',
											}}>
											{doc.nombre + '.' + doc.extension}
										</Typography>

										<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
											{doc.nombre_unidad}
										</Typography>
									</Box>
								</Box>
							</TableCell>

							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{doc.nombre_unidad}
							</TableCell>
							<TableCell
								sx={{
									color: 'text.terciary',
								}}>
								{moment(doc.fecha_creacion).format('LL')}
							</TableCell>
							<TableCell
								align="right"
								sx={{
									color: 'text.terciary',
								}}>
								{/* <Actions user={user} /> */}
								<Box sx={{ display: 'flex' }}>
									<IconButton
										onClick={() => {
											handleDownload(doc);
										}}>
										<Download />
									</IconButton>
									<IconButton
										onClick={() => {
											window.open(URL + doc?.direccion, '__blank');
										}}>
										<OpenInNew />
									</IconButton>
								</Box>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
