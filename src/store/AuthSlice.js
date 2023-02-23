import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import API from '../Utils/Connection';
import { account, setToken, setcClearAccount } from './AccountSlice';

const initialState = {
	isAuth: false,
	isAuthFailed: true,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuth = true;
			state.isAuthFailed = false;
		},
		setAuthFailed: state => {
			state.isAuth = false;
			state.isAuthFailed = true;
		},
		setLogout: state => {
			state.isAuth = false;
		},
	},
});

export const { setAuth, setAuthFailed, setLogout } = authSlice.actions;
export default authSlice.reducer;

export const signin = user => async dispatch => {
	try {
		const r = await API.post('/auth/login', user);
		await dispatch(setToken(r.data.token));
		await dispatch(account(r.data.token));
		dispatch(setAuth());
	} catch (e) {
		Swal.fire('Error', 'Las credenciales no son válidas', 'error');
		dispatch(setAuthFailed());
		throw new Error(e);
	}
};

export const logout = () => async dispatch => {
	dispatch(setcClearAccount());
	dispatch(setLogout());
};
