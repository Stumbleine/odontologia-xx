import { createSlice } from "@reduxjs/toolkit"
import API from "../Utils/Connection";

const initialState = {
    user:null,
    token:null,
}

const accountSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
			state.token = payload;
		},
        setUser:(state,{payload})=>{
            state.user = payload;
        }
    }
})

export const  {setToken,setUser} = accountSlice.actions;
export default accountSlice.reducer;

export const account = (token) => async dispatch => {
	try {
		const r = await API.get('user/cuenta',{ headers: { Authorization: `Bearer ${token}`} });
		console.log('account->r :', r);
        dispatch(setUser(r.data))
	} catch (e) {
		throw new Error(e);
	}
};