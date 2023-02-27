import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';

const initialState = {
	publicDocuments: null,
	totalPD: 0,
	directories: null,
	totalD: 0,
};

const documentsSlice = createSlice({
	name: 'documents',
	initialState,
	reducers: {
		setDocuments: (state, { payload }) => {
			state.publicDocuments = payload.data;
			state.totalPD = payload.total;
		},
		setDirectories: (state, { payload }) => {
			state.directories = payload.data;
			state.totalD = payload.total;
		},
	},
});

export const { setDocuments, setDirectories } = documentsSlice.actions;
export default documentsSlice.reducer;

const constructDocumentURL = (page, search, unidad) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/public/filtro?offset=${page}&search=${search}&unidad=${unidad}`;
	}
	return `/public/listar-archivos-publicos?offset=${page}`;
};

const constructPersonalDocumentURL = (page, search, unidad) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/archivo-publico/listar?offset=${page}&search=${search}&unidad=${unidad}`;
	}
	return `/archivo-publico/listar?offset=${page}`;
};

export const getPublicDocuments =
	(page = 0, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructDocumentURL(page, search, unidad);
		try {
			const r = await API.get(url);
			dispatch(setDocuments(r.data));
		} catch (e) {
			throw new Error(e);
		}
	};

export const getPersonalPublicDocuments =
	(token, page, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructPersonalDocumentURL(page, search, unidad);
		try {
			const r = await API.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(setDocuments(r.data));
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
		dispatch(getPublicDocuments(token));
	} catch (e) {
		throw new Error(e);
	}
};

// directories
const constructDirectoryURL = (page, search, unidad) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/directorio/filtro?offset=${page}&search=${search}&unidad=${unidad}`;
	}
	return `/directorio/listar?offset=${page}&id_unidad=${unidad}`;
};

export const getDirectories =
	(token, page, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructDirectoryURL(page, search, unidad);

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
		dispatch(getDirectories(token));
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
	} catch (e) {
		throw new Error(e);
	}
};
