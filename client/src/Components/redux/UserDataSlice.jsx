import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}
export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        getUser: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const user = (state)=> state.userData.user
export const {getUser} = userDataSlice.actions
export default userDataSlice.reducer