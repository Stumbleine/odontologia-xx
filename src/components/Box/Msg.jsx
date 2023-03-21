import { Box, Typography } from '@mui/material';

export default function Msg({ msg, children }) {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				py: 2,
			}}>
			<Typography sx={{ color: 'secondary' }}>{msg}</Typography>
			{children}
		</Box>
	);
}
