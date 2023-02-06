import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';

const initialState = {
	publicDocuments: null,
	directories: null,
	// privateDocuments: null,
};

const documentsSlice = createSlice({
	name: 'documents',
	initialState,
	reducers: {
		setDocuments: (state, { payload }) => {
			state.publicDocuments = payload;
		},
		setDirectories: (state, { payload }) => {
			state.directories = payload;
		},
	},
});

export const { setDocuments, setDirectories } = documentsSlice.actions;
export default documentsSlice.reducer;

export const getPublicDocuments = (token, idUnidad) => async dispatch => {
	try {
		const r = await API.get(`public/listar-archivos-publicos`);
		dispatch(setDocuments(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

// export const getDocuments = token => async dispatch => {
// 	try {
// 		const r = await API.get(`documento/listar`, {
// 			headers: { Authorization: `Bearer ${token}` },
// 		});
// 		dispatch(setDocuments(r.data));
// 	} catch (e) {
// 		throw new Error(e);
// 	}
// };

export const getDirectories = (token, idUnidad) => async dispatch => {
	try {
		const r = await API.get(`directorio/listar?id_unidad=${1}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setDirectories(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const createDocument = (token, values) => async dispatch => {
	let newFormData = new FormData();
	newFormData.append('nombre', values.directory);
	newFormData.append('id_unidad', values.unidad);
	newFormData.append('descripcion', 'descripcion');

	newFormData.append('accesibilidad', values.accesibility);
	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post('directorio/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('loginManual->r :', r);
		dispatch(getDirectories(token));
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateDocument = (token, values) => async dispatch => {
	let newFormData = new FormData();
	newFormData.append('nombre', values.directory);
	newFormData.append('id_unidad', values.unidad);
	newFormData.append('descripcion', 'descripcion');

	newFormData.append('accesibilidad', values.accesibility);
	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post('directorio/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('loginManual->r :', r);
		dispatch(getDirectories(token));
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteDocument = (token, idDocument) => async dispatch => {
	try {
		const r = await API.post(`archivo-privado/eliminar?id_unidad=${idDocument}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getDirectories(token));
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};
