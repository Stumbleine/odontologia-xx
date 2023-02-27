import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import { Container, Pagination, Stack, Typography } from '@mui/material';
import API from '../../Utils/Connection';
import { useSelector } from 'react-redux';
import LogsTable from '../../components/Table/LogsTable';

export default function Logs() {
	const { token } = useSelector(state => state.account);
	const [logs, setLogs] = useState(null);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);
	const count = Math.ceil(total / 20);

	useEffect(() => {
		const fetchLogs = async () => {
			return await API.get('/logs/listar?offset=' + page, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
		};

		fetchLogs()
			.then(r => {
				setLogs(r.data.data);
				setTotal(r.data.total);
			})
			.catch(e => {
			});
	}, [page]);

	const handlePageActual = (event, value) => {
		setPage(parseInt(value) - 1);
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
					Logs
				</Typography>

				<LogsTable logs={logs} />
				<Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
					<Pagination
						count={count}
						variant="outlined"
						shape="rounded"
						page={parseInt(page) + 1}
						onChange={handlePageActual}
					/>
				</Stack>
			</Container>
		</Page>
	);
}
