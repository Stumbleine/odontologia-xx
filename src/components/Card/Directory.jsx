import { Delete, Edit, Folder, FolderOpen, NoteAdd, OpenInFull } from '@mui/icons-material';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Icon,
	IconButton,
	Typography,
} from '@mui/material';
import React from 'react';

export default function Directory({ directory }) {
	return (
		<Card sx={{width:'100%'}}>
            <CardActionArea>
                <Icon sx={{width:'100%',bgcolor:'secondary.main',height:100}}>
                    <Folder sx={{fontSize:100,color:'terciary.main'}}/>
                </Icon>
            </CardActionArea>
			<CardContent sx={{pt:1,pb:0}}>
				<Typography noWrap variant="h6" fontWeight={600}>
					{directory.nombre}
				</Typography>
				<Typography noWrap >
					{directory.descripcion}
				</Typography>
				<Typography noWrap variant="subtitle2" sx={{color:'text.black'}}>
					{directory.fecha}
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{justifyContent:'flex-end'}}>
				
				<IconButton>
					<Delete />
				</IconButton>
				<IconButton>
					<Edit />
				</IconButton>
                
                <IconButton>
					<NoteAdd />
				</IconButton>
                <IconButton>
					<OpenInFull />
				</IconButton>
			</CardActions>
		</Card>
	);
}
