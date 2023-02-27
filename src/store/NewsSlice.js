import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';
import { account, setToken } from './AccountSlice';
import { convertToB64 } from '../Utils/Converter';
import { fireAlert } from '../Utils/Sweet';

const initialState = {
	news: [],
	total: 0,
	// pagFilter:0
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setNews: (state, { payload }) => {
			state.news = payload;
		},
		setTotal: (state, { payload }) => {
			state.total = payload;
		},
	},
});

export const { setNews, setTotal } = newsSlice.actions;
export default newsSlice.reducer;

export const create = (token, values) => async dispatch => {
	const foto = await convertToB64(values.cover);
	let newFormData = new FormData();
	newFormData.append('titulo', values.title);
	newFormData.append('subtitulo', values.descripcion);
	newFormData.append('unidad', values.unidad);
	newFormData.append('foto', foto);

	if(values.files){
		values.files.forEach(element => {
			newFormData.append('files[]', element);
		});
	}

	try {
		const r = await API.post('/noticia/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (e) {
		throw new Error(e);
	}
};

const constructURL = (offset, search, unidad, id) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/noticia/filtro?offset=${offset}&search=${search}&unidad=${unidad}`;
	} else if (id !== undefined && id !== null) {
		return `/noticia/listar-noticias?offset=${offset}&id_noticia=${id}`;
	}
	return `/noticia/filtro?offset=${offset}`;
};

export const getNews =
	(token, offset = 0, id = null, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructURL(offset, search, unidad, id);
		try {
			const r = await API.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setNews(r.data.data));
			dispatch(setTotal(r.data.total));
		} catch (e) {
			throw new Error(e);
		}
	};

const constructPublicURL = (search, unidad, id) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/public/filtro?search=${search}&unidad=${unidad}`;
	} else if (id !== undefined && id !== null) {
		return `/public/listar-noticias?id_noticia=${id}`;
	}
	return `/public/listar-noticias`;
};
export const getPublicNews =
	(token, id = null, search = 'all', unidad = 'all') =>
	async dispatch => {
		let url = constructPublicURL(search, unidad, id);
		try {
			const r = await API.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch(setNews(r.data.data));
			dispatch(setTotal(r.data.total));
		} catch (e) {
			throw new Error(e);
		}
	};

export const deleteNew = (token, idNew) => async dispatch => {
	try {
		const r = await API.delete(`/noticia/eliminar?id=` + idNew, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const updateNew = (token, values) => async dispatch => {
	let newFormData = new FormData();
	if (values.cover) {
		const foto = await convertToB64(values.cover);
		newFormData.append('foto', foto);
	}
	newFormData.append('titulo', values.title);
	newFormData.append('subtitulo', values.descripcion);

	try {
		const r = await API.post('/noticia/actualizar?id_noticia=' + values.id, newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		fireAlert({ title: 'Noticia actualizada con exito', icon: 'success' });
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteNewFile = (token, idNew, idFile) => async dispatch => {
	try {
		const r = await API.delete(
			`/noticia/eliminar-adjunto?id=${idNew}&id_adjunto=${idFile}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateNewFiles = (token, idNew, files) => async dispatch => {
	let newFormData = new FormData();

	newFormData.append('id_unidad', 1);
	files.forEach(element => {
		newFormData.append('files[]', element);
	});
	try {
		const r = await API.post('/noticia/agregar-adjuntos?id=' + idNew, newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		fireAlert({ title: 'Archivo añadido correctamente', icon: 'success' });
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};
