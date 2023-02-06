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
	newFormData.append('id_unidad', 1);

	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	/*
	for (const value of newFormData.values()) {
		console.log(value);
	}
    */
	try {
		const r = await API.post('noticia/crear', newFormData, {
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

export const getNews = token => async dispatch => {
	try {
		const r = await API.get(`public/listar-noticias`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('newslist', r.data);
		dispatch(setNews(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteNew = token => async dispatch => {
	try {
		const r = await API.get(`public/listar-noticias`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('newslist', r.data);
		dispatch(setNews(r.data));
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

	values.files.forEach(element => {
		newFormData.append('files[]', element);
	});
	/*
	for (const value of newFormData.values()) {
		console.log(value);
	}
    */
	try {
		const r = await API.post('noticia/crear', newFormData, {
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
