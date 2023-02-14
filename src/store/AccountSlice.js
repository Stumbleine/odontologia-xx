import { createSlice } from '@reduxjs/toolkit';
import API from '../Utils/Connection';

const initialState = {
	user: null,
	token: null,
	rol: 'guest',
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		setToken: (state, { payload }) => {
			state.token = payload;
		},
		setUser: (state, { payload }) => {
			state.user = payload;
			payload?.roles.forEach(r => {
				state.rol = r.name;
			});
		},
		setcClearAccount: state => {
			state.user = null;
			state.token = null;
			state.rol = 'guest';
		},
	},
});

export const { setToken, setUser, setcClearAccount } = accountSlice.actions;
export default accountSlice.reducer;

export const account = token => async dispatch => {
	try {
		const r = await API.get('/user/cuenta', {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log('account->r :', r);
		dispatch(setUser(r.data));
	} catch (e) {
		throw new Error(e);
	}
};
