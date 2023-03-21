import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';
import { account, setToken } from './AccountSlice';
import { convertToB64 } from '../Utils/Converter';

const initialState = {
	unidades: [],
};

const unidadSlice = createSlice({
	name: 'unidad',
	initialState,
	reducers: {
		setUnidades: (state, { payload }) => {
			state.unidades = payload;
		},
	},
});

export const { setUnidades } = unidadSlice.actions;
export default unidadSlice.reducer;

export const getunidades = token => async dispatch => {
	try {
		const r = await API.get('/unidad/listar', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUnidades(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const getResponsable = idUnidad => async dispatch => {
	try {
		return await API.get(`/public/get-jefe?id_unidad=${idUnidad}`);
	} catch (e) {
		throw new Error(e);
	}
};

export const updateUnidad = (values, token) => async dispatch => {

	if (values.cover) {
		const foto = await convertToB64(values.cover);
		values.cover = foto
	}else{
		delete values.cover
	}

	try {
		
		await API.put(`/unidad/actualizar`, values,{
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getResponsable(values.id));
	} catch (e) {
		throw new Error(e);
	}
};
