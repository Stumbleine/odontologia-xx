import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';
import { account, setToken } from './AccountSlice';

const initialState = {
	users: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, { payload }) => {
			state.users = payload;
		},
	},
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const registerUser = (token, user) => async dispatch => {
	try {
		const r = await API.post('user/registro', user, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('loginManual->r :', r);
		dispatch(getUsers(token));
	} catch (e) {
		throw new Error(e);
	}
};
const constructURL = (search, unidad, rol) => {
	if (search !== 'all' || unidad !== 'all' || rol !== 'all') {
		return `/user/filtro?search=${search}&unidad=${unidad}&rol=${rol}`;
	}
	return `/user/listar`;
};
export const getUsers = (token, search, unidad, rol) => async dispatch => {
	let url = constructURL(search, unidad, rol);
	try {
		const r = await API.get(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setUsers(r.data));
	} catch (e) {
		throw new Error(e);
	}
};

export const updateUser = (token, values, idUser) => async dispatch => {
	try {
		const r = await API.put(`user/actualizar?id=` + idUser, values, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getUsers(token));
	} catch (e) {
		throw new Error(e);
	}
};
export const deleteUser = (token, idUser) => async dispatch => {
	try {
		const r = await API.delete(`user/eliminar?id=` + idUser, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(getUsers(token));
	} catch (e) {
		throw new Error(e);
	}
};
