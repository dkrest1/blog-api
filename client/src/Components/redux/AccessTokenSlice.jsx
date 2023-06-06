import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    token: Cookies.get('token') || null
}

export const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        getToken: (state, action)=>{
            state.token = action.payload
        },

    }
})

export const token = (state)=> state.accessToken.token
export  const{getToken} = accessTokenSlice.actions
export default accessTokenSlice.reducer