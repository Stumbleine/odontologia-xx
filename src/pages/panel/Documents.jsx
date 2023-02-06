import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import { Box, Container, Stack } from '@mui/system';
import DocumentsGrid from '../../components/Grid/DocumentsGrid';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Typography,
} from '@mui/material';
import { Link, Outlet, useLocation, useRoutes } from 'react-router-dom';
import { Add, Lock, Public } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import DirectoriesGrid from '../../components/Grid/DirectoriesGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getDirectories, getPublicDocuments } from '../../store/DocumentSlice';

export default function Documents() {
	const theme = useTheme();
	const [jefatura, setJefatura] = useState('All');
	const [mode, setMode] = useState('public');
	const { token } = useSelector(state => state.account);
	const { publicDocuments, directories } = useSelector(state => state.documents);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPublicDocuments(token, jefatura));
		dispatch(getDirectories(token, jefatura));
	}, []);

	const handleJefatura = event => {
		setJefatura(event.target.value);
		// dispatch(filterOffersAsync(accessToken, search, idc, event.target.value));
	};
	return (
		<Page settings={{ pt: 5, pb: 10 }}>
			<Container maxWidth="xl" sx={{}}>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: 'text.auxiliar',
					}}>
					Archivos
				</Typography>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ py: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
						<Typography sx={{ mr: 2 }}>Ver documentos de:</Typography>
						<FormControl sx={{ minWidth: { xs: 1, sm: 160 } }} size="small">
							<InputLabel id="label">Jefatura</InputLabel>
							<Select
								labelId="label"
								id="j-filter"
								defaultValue={'All'}
								onChange={handleJefatura}
								input={<OutlinedInput id="j-filter" label="Estado" />}>
								<MenuItem value="All">Todos</MenuItem>
								<MenuItem value="VIGENTE">Vigente</MenuItem>
								<MenuItem value="EXPIRADO">Expirado</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Button
						sx={{ width: { xs: '100%', md: 'auto' } }}
						// disabled={disabledBtn}
						component={Link}
						to="/panel/subir-documento"
						startIcon={<Add />}
						variant="contained">
						Archivo
					</Button>
				</Stack>
				<Stack direction="row">
					<Button
						sx={{
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 0,
							borderTopRightRadius: 0,
							borderColor: 'none',
							color: mode === 'public' ? 'white' : 'text.terciary',
							boxShadow: 'none',
						}}
						color="terciary"
						onClick={() => {
							setMode('public');
						}}
						// disabled={disabledBtn}
						// component={Link}
						// to="/panel/subir-documento"
						// to="/panel/archivos"
						startIcon={<Public />}
						variant={mode === 'public' ? 'contained' : 'outlined'}>
						Publico
					</Button>
					<Button
						color="terciary"
						sx={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 0,
							borderColor: 'none',
							color: mode === 'private' ? 'white' : 'text.terciary',
							boxShadow: 'none',
						}}
						onClick={() => {
							setMode('private');
						}}
						// color="terciary"
						// disabled={disabledBtn}
						// component={Link}
						// to="/panel/subir-documento"
						// to="/panel/archivos/directory"
						startIcon={<Lock />}
						variant={mode === 'private' ? 'contained' : 'outlined'}>
						Privado
					</Button>
				</Stack>
				<Box
					sx={{
						border: '1px solid',
						p: 3,
						borderRadius: 5,
						background: theme.palette.terciary.main,
						borderTopLeftRadius: 0,
						borderColor: theme.palette.terciary.main,
					}}>
					{mode === 'public' ? (
						<DocumentsGrid documents={publicDocuments} />
					) : (
						<DirectoriesGrid directories={directories} />
					)}
				</Box>
			</Container>
		</Page>
	);
}
