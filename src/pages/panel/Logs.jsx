import React, { useEffect, useState } from 'react';
import Page from '../../components/Box/Page';
import { Container, Typography } from '@mui/material';
import API from '../../Utils/Connection';
import { useSelector } from 'react-redux';
import LogsTable from '../../components/Table/LogsTable';

export default function Logs() {
	const { token } = useSelector(state => state.account);
	const [logs, setLogs] = useState(null);
	useEffect(() => {
		const fetchLogs = async () => {
			return await API.get('/logs/listar', {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
		};

		fetchLogs()
			.then(r => {
				setLogs(r.data.data);
			})
			.catch(e => {
				console.log('error', e);
			});
	}, []);

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
			</Container>
		</Page>
	);
}
