import { createSlice } from "@reduxjs/toolkit"
import API from "../Utils/Connection";
import { account, setToken } from "./AccountSlice";

const initialState = {
    users: null,
}

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setUsers: (state,{payload}) => {
            state.users = payload;
        },

    }
})

export const  {setUsers} = usersSlice.actions;
export default usersSlice.reducer;

export const registerUser = (token,user) => async dispatch => {
	try {
		const r = await API.post('user/registro', user,{
            headers: { Authorization: `Bearer ${token}` },
        });
		console.log('loginManual->r :', r);
        dispatch(getUsers(token))
	} catch (e) {
		throw new Error(e);
	}
};

export const getUsers = (token) => async dispatch=>{
    try{
        const r = await API.get(`user/listar`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(setUsers(r.data))
    }catch (e) {
        throw new Error(e);
    }
}
