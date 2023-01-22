import { createSlice } from "@reduxjs/toolkit"
import API from "../Utils/Connection";
import { account, setToken } from "./AccountSlice";

const initialState = {
    isAuth: false,
    isAuthFailed:true,
    token:null,
}

const authSlice = createSlice({
    name:'auth',
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
    }
})

export const  {setAuth,setAuthFailed} = authSlice.actions;
export default authSlice.reducer;


export const signin = user => async dispatch => {
	try {
		const r = await API.post('auth/login', user);
		console.log('loginManual->r :', r);
		await dispatch(setToken(r.data.token));
        await dispatch(account(r.data.token))
		dispatch(setAuth());
	} catch (e) {
		dispatch(setAuthFailed());
		throw new Error(e);
	}
};