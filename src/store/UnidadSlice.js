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

export const updateUnidad = values => async dispatch => {
	try {
		await API.post(`/public/get-jefe?id_unidad=${values.id}`, values);
		dispatch(getResponsable(values.id));
	} catch (e) {
		throw new Error(e);
	}
};
