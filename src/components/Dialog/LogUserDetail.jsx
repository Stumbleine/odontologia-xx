import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { useState } from 'react';

export default function LogUserDetail({ disabled, user }) {
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
				sx={{ color: 'primary.main' }}
				disabled={disabled}
				size="small"
				variant="outlined"
				onClick={handleClickOpen}>
				Ver detalle
			</Button>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}>
				<DialogTitle>Informacion de usuario capturado</DialogTitle>
				<DialogContent sx={{ minWidth: 500 }}>
					<Typography color="terciary" component="pre" sx={{ color: 'terciary.main' }}>
						{JSON.stringify(user, null, 2)}
					</Typography>
					<DialogActions sx={{ p: 0 }}>
						<Button
							sx={{ color: 'text.primary' }}
							onClick={handleClose}
							// fullWidth
							variant="outlined">
							Cerrar
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}
