import { SearchRounded } from '@mui/icons-material';
import {
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
export default function Filter({
	handleSearch,
	handleUnidad,
	dark,
	prefixId = 'input',
	children,
}) {
	const [backScapePressed, setBackScapePressed] = useState(false);
	const { unidades } = useSelector(state => state.unidad);

	const handleKeyDown = event => {
		if (event.key === 'Backspace') {
			setBackScapePressed(true);
		} else {
			setBackScapePressed(false);
		}
	};
	const initialPblic = { searchPublic: '' };
	const initialDir = { searchDir: '' };

	const formik = useFormik({
		initialValues: prefixId === 'public' ? initialPblic : initialDir,
		validationSchema:
			prefixId === 'public'
				? Yup.object({
						searchPublic: Yup.string().required(),
				  })
				: Yup.object({
						search: Yup.string().required(),
				  }),
		onSubmit: values => {
			handleSearch(values);
		},
	});
	const { getFieldProps, values } = formik;
	useEffect(() => {
		if (prefixId === 'public') {
			if (values.searchPublic === '' && backScapePressed) {
				handleSearch({ searchPublic: 'all' });
			}
		} else {
			if (values.search === '' && backScapePressed) {
				handleSearch({ search: 'all' });
			}
		}
	}, [backScapePressed, values]);
	return (
		<FormikProvider value={formik} sx={{ flexGrow: 1 }} key={prefixId}>
			<Form onSubmit={formik.handleSubmit}>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					{/* <Typography>{prefixId}</Typography> */}
					{children}
					<FormControl
						sx={{ minWidth: { xs: 1, sm: 160 } }}
						size="small"
						key={prefixId}
						id={prefixId + '-formcontrol'}>
						<InputLabel sx={{ color: dark && 'white' }} id={prefixId + 'label'}>
							Jefatura
						</InputLabel>
						<Select
							labelId={prefixId + 'label'}
							id={prefixId + '-filter'}
							sx={{
								color: dark && 'white',
								'&.MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: dark && 'white',
									},
								},
							}}
							defaultValue={'all'}
							onChange={handleUnidad}
							input={<OutlinedInput id={prefixId + '-filter'} label="Jefatura" />}>
							<MenuItem value="all">Todos</MenuItem>
							{unidades?.map(und => (
								<MenuItem key={und.id} value={und.id}>
									{und.nombre}
								</MenuItem>
							))}
							{/* <MenuItem value="EXPIRADO">Expirado</MenuItem> */}
						</Select>
					</FormControl>
					<TextField
						size="small"
						// name="search"
						onKeyDown={handleKeyDown}
						{...getFieldProps(prefixId === 'public' ? 'searchPublic' : 'search')}
						variant="outlined"
						placerholder="Buscar usuario"
						fullWidth
						id={prefixId + '-search'}
						InputProps={{
							sx: {
								color: dark && 'white',
								'&.MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: dark && 'white',
									},
								},
								maxWidth: { xs: '100%', md: 500 },
								// minWidth: { xs: '100%', sm: 160 },
							},
							startAdornment: (
								<IconButton
									type="submit"
									edge="end"
									sx={{ mr: 0.5, color: dark && 'white' }}>
									<SearchRounded />
								</IconButton>
							),
						}}
					/>
				</Stack>
			</Form>
		</FormikProvider>
	);
}
