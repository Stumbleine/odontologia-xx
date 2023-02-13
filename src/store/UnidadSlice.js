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
		console.log('unidades', r.data);
		dispatch(setUnidades(r.data));
	} catch (e) {
		throw new Error(e);
	}
};
