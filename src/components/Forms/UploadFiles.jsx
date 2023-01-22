import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DocumentsGrid from '../Grid/DocumentsGrid';
import { documents } from '../../Utils/Constants';
import { Add } from '@mui/icons-material';

export default function UploadFiles({ handleChangeFiles }) {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const handleFileEvent = e => {
		const chosenFiles = Array.prototype.slice.call(e.target.files);
		console.log(chosenFiles)
		setUploadedFiles(chosenFiles);
		handleChangeFiles(chosenFiles);
	};
	return (
		<Box sx={{ width: '100' }}>
			<Box
				sx={{
					width: '100%',
					height: 'auto',
					minHeight:150,
					border: 1,
					p: 1,
					borderRadius: 2,
					mb: 1,
				}}>
				<DocumentsGrid documents={uploadedFiles} minimal={true} />
			</Box>
			<label htmlFor="file-upload">
				<input
					id="file-upload"
					multiple
					type="file"
					style={{ display: 'none' }}
					onChange={handleFileEvent}
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100%',
					}}>
					<Button
						component="span"
						sx={{ color: 'text.primary' }}
						startIcon={<Add />}
						variant="outlined">
						{uploadedFiles ? 'Cambiar documentos' : 'Adjuntar documentos'}
					</Button>
				</Box>
			</label>
		</Box>
	);
}
