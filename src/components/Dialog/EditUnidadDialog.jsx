import { Edit } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditUnidad from '../Forms/EditUnidad';

export default function EditUnidadDialog({ unidad, disabled }) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<IconButton disabled={disabled} size="small" onClick={handleClickOpen}>
				<Edit
					sx={{
						color: disabled ? '' : 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>
			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				disableEscapeKeyDown={true}
				// TransitionComponent={Transition}
			>
				<DialogTitle>Editar unidad </DialogTitle>
				<EditUnidad />
			</Dialog>
		</>
	);
}
