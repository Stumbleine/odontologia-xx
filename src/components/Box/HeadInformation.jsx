import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';

export default function HeadInformation({ head }) {
	const [cargo, setCargo] = useState("");

	useEffect(() => {
		if(head){
			switch (head.id_unidad) {
				case 1:
					setCargo("Jefe de la jefatura de extensión")
					break;
				case 2:
					setCargo("Jefe de la jefatura de investigación")
					break
				case 3:
					setCargo("Jefe de la jefatura de internado rotatorio")
					break
				case 4:
					setCargo("Jefe de la jefatura académica")
					break
				case 5:
					setCargo("Jefe de la jefatura de clínicas")
					break;
				case 6:
					setCargo("Director de la carrera")
					break
				case 7:
					setCargo("Encargado de la unidad")
					break
				default:
					break;
			}
		}
	}, [head])
	return (
		<Box sx={{ display: 'flex', flexGrow: 0, justifyContent:"flex-end" }}>
			<Stack sx={{ px: 0, textAlign:"end"}}>
				<Typography fontWeight={600}>
					{head?.nombres} {head?.apellidos}
				</Typography>

				<Typography>{cargo}</Typography>
			</Stack>
		</Box>
	);
}
