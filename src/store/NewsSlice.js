import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';
import { account, setToken } from './AccountSlice';
import { convertToB64 } from '../Utils/Converter';

const initialState = {
	news: [],
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setNews: (state, { payload }) => {
			state.news = payload;
		},
	},
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;

export const create = (token, values) => async dispatch => {
	const foto = await convertToB64(values.cover);
	let newFormData = new FormData();
	newFormData.append('titulo', values.title);
	newFormData.append('subtitulo', values.descripcion);

	newFormData.append('foto', foto);

	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	/*
	for (const value of newFormData.values()) {
		console.log(value);
	}
    */
	try {
		const r = await API.post('/noticia/crear', newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('createNew->r :', r);
	} catch (e) {
		throw new Error(e);
	}
};

const constructURL = (search, unidad, id) => {
	if (search !== 'all' || unidad !== 'all') {
		return `/noticia/filtro?search=${search}&unidad=${unidad}`;
	} else if (id !== undefined && id !== null) {
		return `/noticia/listar-noticias?id_noticia=${id}`;
	}
	return `/public/listar-noticias`;
};

export const getNews =
	(token, id = null, search = 'all', unidad = 'all') =>
	async dispatch => {
		console.log(id, search, unidad);
		let url = constructURL(search, unidad, id);
		try {
			const r = await API.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log('newslist', r.data);
			dispatch(setNews(r.data));
		} catch (e) {
			throw new Error(e);
		}
	};

export const deleteNew = (token, idNew) => async dispatch => {
	try {
		const r = await API.delete(`/noticia/eliminar?id=` + idNew, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('newslist', r.data);
		// dispatch(setNews(r.data));
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const updateNew = (token, values) => async dispatch => {
	const foto = await convertToB64(values.cover);
	let newFormData = new FormData();
	newFormData.append('titulo', values.title);
	newFormData.append('subtitulo', values.descripcion);
	newFormData.append('foto', foto);
	newFormData.append('id_unidad', 1);

	try {
		const r = await API.post('/noticia/actualizar?id_noticia=' + values.id, newFormData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
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
		// console.log('newslist', r.data);
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
		dispatch(getNews(token));
	} catch (e) {
		throw new Error(e);
	}
};
