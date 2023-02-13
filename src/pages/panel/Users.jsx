import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import RegisterForm from '../../components/Forms/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/UsersSlice';
import { Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UsersTable from '../../components/Table/UsersTable';
import Filter from '../../components/Forms/Filter';

export default function Users() {
	const { users } = useSelector(state => state.users);
	const { token } = useSelector(state => state.account);
	const [filter, setFilter] = useState({ search: 'all', unidad: 'all', rol: 'all' });

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers(token, filter.search, filter.unidad, filter.rol));
	}, []);
	const handleRol = event => {
		setFilter({ ...filter, rol: event.target.value });
		dispatch(getUsers(token, filter.search, filter.unidad, event.target.value));
	};
	const handleUnidad = event => {
		setFilter({ ...filter, unidad: event.target.value });
		dispatch(getUsers(token, filter.search, event.target.value, filter.rol));
	};
	const handleSearch = values => {
		setFilter({ ...filter, search: values.search });
		dispatch(getUsers(token, values.search, filter.unidad, filter.rol));
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
					Usuarios
				</Typography>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ mb: 2, justifyContent: 'space-between' }}>
					<Filter
						handleSearch={handleSearch}
						handleUnidad={handleUnidad}
						prefixId="users">
						<FormControl
							sx={{ minWidth: { xs: 1, sm: 160 } }}
							size="small"
							id={'rol-formcontrol'}>
							<InputLabel id={'rol-label'}>Rol</InputLabel>
							<Select
								labelId="rol-label"
								id={'rol-filter'}
								defaultValue={'all'}
								onChange={handleRol}
								input={<OutlinedInput id={'rol-filter'} label="Rol" />}>
								<MenuItem value="all">Todos</MenuItem>
								<MenuItem value="ADM">Administrador</MenuItem>
								<MenuItem value="SUPER">Super Administrador</MenuItem>
								<MenuItem value="SCRE">Secretaria</MenuItem>
								{/* <MenuItem value="EXPIRADO">Expirado</MenuItem> */}
							</Select>
						</FormControl>
					</Filter>

					<Button
						sx={{ width: { xs: '100%', md: 'auto' } }}
						// disabled={disabledBtn}
						component={Link}
						to="/panel/añadir-usuario"
						startIcon={<Add />}
						variant="contained">
						Usuario
					</Button>
				</Stack>
				<UsersTable users={users} />
			</Container>
		</Page>
	);
}
