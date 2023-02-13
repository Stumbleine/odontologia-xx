import { Delete, WarningAmber } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material';
import React from 'react';

export default function DeleteAlert({ disabled, item, deleteFetch }) {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const deleteItem = async () => {
		await deleteFetch(item.id);
	};

	return (
		<>
			<IconButton disabled={disabled || false} size="small" onClick={handleClickOpen}>
				<Delete
					sx={{
						color: disabled ? 'disabled' : 'text.auxiliar',
						'&:hover': {
							color: 'error.light',
						},
					}}
				/>
			</IconButton>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				// TransitionComponent={Transition}
				onClose={handleClose}>
				<DialogTitle>{'Eliminar ' + item.type + ': ' + item.name + '?'}</DialogTitle>
				<DialogContent>
					<DialogContentText display="flex" alignItems="center">
						<WarningAmber color="error" sx={{ mr: 1 }} />
						{'Esta acción removerá el' + item.type + 'permanentemente'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose}>
						Cancelar
					</Button>
					<Button
						color="error"
						variant="contained"
						onClick={() => {
							deleteItem().then(e => {
								handleClose();
							});
						}}>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
