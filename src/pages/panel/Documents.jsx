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
	Pagination,
	Select,
	Typography,
} from '@mui/material';
import { Link, Outlet, useLocation, useRoutes } from 'react-router-dom';
import { Add, Lock, Public } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import DirectoriesGrid from '../../components/Grid/DirectoriesGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getDirectories, getPersonalPublicDocuments } from '../../store/DocumentSlice';
import { grey } from '@mui/material/colors';
import Filter from '../../components/Forms/Filter';
import Msg from '../../components/Box/Msg';

export default function Documents() {
	const theme = useTheme();
	// const [jefatura, setJefatura] = useState('All');
	const [mode, setMode] = useState('public');
	const { token, rol } = useSelector(state => state.account);
	const { publicDocuments, directories, totalPD, totalD } = useSelector(
		state => state.documents
	);
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all' });
	const [filterDir, setFilterDir] = useState({ search: 'all', unidad: 'all' });
	const [pagePD, setPagePD] = useState(0);
	const [pageD, setPageD] = useState(0);

	const countPD = Math.ceil(totalPD / 20);
	const countD = Math.ceil(totalD / 20);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPersonalPublicDocuments(token, pagePD, filter.search));
	}, [pagePD]);

	useEffect(() => {
		dispatch(getDirectories(token, pagePD, filterDir.search, filterDir.unidad));
	}, [pageD]);

	const handlePublicUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(
			getPersonalPublicDocuments(token, pagePD, filter.search, event.target.value)
		);
	};
	const handlePublicSearch = values => {
		setFilter({ ...filter, search: values.searchPublic });
		dispatch(getPersonalPublicDocuments(token, pagePD, values.searchPublic));
	};
	const handleDirectoriesUnidad = event => {
		setFilterDir({ ...filterDir, unidad: event.target.value });
		dispatch(
			getPersonalPublicDocuments(token, pagePD, filterDir.search, event.target.value)
		);
	};
	const handleDirectoriesSearch = values => {
		setFilterDir({ ...filterDir, search: values.search });
		dispatch(getDirectories(token, values.search, filterDir.unidad));
	};
	const handlePagePublic = (event, value) => {
		dispatch(setPagePD(parseInt(value) - 1));
	};
	const handlePageDirectories = (event, value) => {
		dispatch(setPageD(parseInt(value) - 1));
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
				{/* {rol === 'ADM' && ( */}
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ py: 2, justifyContent: 'flex-end' }}>
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
				{/* )} */}
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
						<>
							<Filter
								dark={true}
								handleSearch={handlePublicSearch}
								handleUnidad={handlePublicUnidad}
								prefixId="public"
							/>
							<Box sx={{ my: 2 }}></Box>
							{publicDocuments?.length > 0 ? (
								<DocumentsGrid documents={publicDocuments} />
							) : (
								<Msg msg={'No se encontraron archivos publicos.'} />
							)}
							<Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
								<Pagination
									count={countPD}
									variant="outlined"
									shape="rounded"
									sx={{ color: 'primary', borderColor: 'white' }}
									page={parseInt(pagePD) + 1}
									onChange={handlePagePublic}
								/>
							</Stack>
						</>
					) : (
						<>
							<Filter
								dark={true}
								handleSearch={handleDirectoriesSearch}
								handleUnidad={handleDirectoriesUnidad}
								prefixId="directory"
							/>
							<Box sx={{ my: 2 }}></Box>
							{directories?.length > 0 ? (
								<DirectoriesGrid directories={directories} />
							) : (
								<Msg msg={'No se encontraron archivos/directorios.'} />
							)}
							<Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
								<Pagination
									count={countD}
									variant="outlined"
									shape="rounded"
									page={parseInt(pageD) + 1}
									sx={{ color: 'primary' }}
									onChange={handlePageDirectories}
								/>
							</Stack>
						</>
					)}
				</Box>
			</Container>
		</Page>
	);
}
