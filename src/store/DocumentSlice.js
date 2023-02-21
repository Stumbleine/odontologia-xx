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

const constructDocumentURL = (search, unidad) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/public/filtro?search=${search}&unidad=${unidad}`;
	}
	return `/public/listar-archivos-publicos`;
};

const constructPersonalDocumentURL = search => {
	if (search !== 'all') {
		return `/archivo-publico/listar?search=${search}`;
	}
	return `/archivo-publico/listar`;
};

export const getPublicDocuments =
	(search = 'all', unidad = 'all') =>
	async dispatch => {
		console.log('HOLA', search);
		let url = constructDocumentURL(search, unidad);
		try {
			const r = await API.get(url);
			dispatch(setDocuments(r.data.data));
		} catch (e) {
			throw new Error(e);
		}
	};

export const getPersonalPublicDocuments =
	(token, search = 'all') =>
	async dispatch => {
		console.log(search);
		let url = constructPersonalDocumentURL(search);
		try {
			const r = await API.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(setDocuments(r.data.data));
		} catch (e) {
			throw new Error(e);
		}
	};
export const createDocument = (token, values) => async dispatch => {
	let newFormData = new FormData();
	newFormData.append('nombre', values.directory);
	newFormData.append('id_unidad', values.unidad);
	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post('/archivo-publico/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('loginManual->r :', r);
		// dispatch(getDirectories(token));
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
		// dispatch(getDirectories(token));
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

// directories
const constructDirectoryURL = (search, unidad) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/directorio/filtro?search=${search}&unidad=${unidad}`;
	}
	return `/directorio/listar?id_unidad=${1}`;
};

export const getDirectories =
	(token, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructDirectoryURL(search, unidad);

		try {
			const r = await API.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setDirectories(r.data));
		} catch (e) {
			throw new Error(e);
		}
	};

export const createDirectory = (token, values) => async dispatch => {
	let newFormData = new FormData();
	newFormData.append('nombre', values.directory);
	newFormData.append('descripcion', values.descripcion);
	newFormData.append('unidad', values.unidad);

	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post('/directorio/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('loginManual->r :', r);
		dispatch(getDirectories(token));
		// dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteDocument = (token, idDocument) => async dispatch => {
	try {
		const r = await API.delete(`/archivo-privado/eliminar?id_archivo=${idDocument}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getDirectories(token));
		// dispatch(getPublicDocuments(token));
	} catch (e) {
		try {
			const r = await API.delete(`/archivo-publico/eliminar?id_archivo=${idDocument}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(getPersonalPublicDocuments(token));
		} catch (error) {
			throw new Error(e);
		}
	}
};
// directorie (archivos privados)
export const deleteDirectory = (token, idDirectory) => async dispatch => {
	try {
		const r = await API.delete(`/directorio/eliminar?id=${idDirectory}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getDirectories(token));
		// dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateFilesDirectory = (token, files, idDirectory) => async dispatch => {
	let newFormData = new FormData();

	files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post(`/directorio/actualizar?id=${idDirectory}`, newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		dispatch(getDirectories(token));
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};
