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

export default function Users() {
	const { users } = useSelector(state => state.users);
	const { token } = useSelector(state => state.account);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers(token));
	}, []);
	const [rol, setRol] = useState('All');
	const handleFilterRol = event => {
		setRol(event.target.value);
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
					Usuarios
				</Typography>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ py: 2 }}>
					<FormControl sx={{ minWidth: { xs: 1, sm: 160 }, flexGrow: 1 }} size="small">
						<InputLabel id="label">Roles</InputLabel>
						<Select
							labelId="label"
							id="rol-filter"
							defaultValue={'All'}
							onChange={handleFilterRol}
							input={<OutlinedInput id="rol-filter" label="Estado" />}>
							<MenuItem value="All">Todos</MenuItem>
							<MenuItem value="VIGENTE">Administrador</MenuItem>
							<MenuItem value="EXPIRADO">Secretaria</MenuItem>
						</Select>
					</FormControl>
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
			</Container>
		</Page>
	);
}
