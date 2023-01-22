import { createSlice } from "@reduxjs/toolkit"
import API from "../Utils/Connection";
import { account, setToken } from "./AccountSlice";

const initialState = {
    users: null,
}

const documentsSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setUsers: (state,{payload}) => {
            state.users = payload;
        },

    }
})

export const  {setUsers} = documentsSlice.actions;
export default documentsSlice.reducer;

export const createDocument = (token,values) => async dispatch => {
    let newFormData = new FormData();
	newFormData.append('nombre', values.directory);
	newFormData.append('id_unidad', values.unidad);
	newFormData.append('descripcion','descripcion');

	newFormData.append('accesibilidad', values.accesibility);
    values.files.forEach(element => {
        newFormData.append('files[]', element);
    });
	try {
		const r = await API.post('directorio/crear', newFormData,{
            headers: { Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data' },
        });
		console.log('loginManual->r :', r);
        dispatch(getDocuments(token))
	} catch (e) {
		throw new Error(e);
	}
};

export const getDocuments = (token) => async dispatch=>{
    try{
        const r = await API.get(`documento/listar`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(setUsers(r.data))
    }catch (e) {
        throw new Error(e);
    }
}
