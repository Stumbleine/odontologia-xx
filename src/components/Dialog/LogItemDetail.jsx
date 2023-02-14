import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function LogItemDetail({ disabled, data }) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Button
				color="secondary"
				disabled={disabled}
				size="small"
				onClick={handleClickOpen}>
				Ver detalle
			</Button>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}>
				<DialogTitle>Informacion capturado</DialogTitle>
				<DialogContent sx={{ minWidth: 500 }}>
					<Typography color="terciary" component="pre">
						{JSON.stringify(data, null, 2)}
					</Typography>
					<DialogActions sx={{ p: 0 }}>
						<Button
							sx={{ color: 'text.primary' }}
							onClick={handleClose}
							// fullWidth
							variant="outlined">
							Cancelar
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}
