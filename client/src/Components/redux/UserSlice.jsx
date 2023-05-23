import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name : localStorage.getItem('userName') ||'Emmanuel Ayodeji',
    email: localStorage.getItem('userEmail') ||'emma@gmail.com',
    profilePic: localStorage.getItem('profilePic') || null,
    role: localStorage.getItem('userRole') ||'author', 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addFile: (state, action)=>{
            state.profilePic = action.payload
        },
        nameChange: (state, action)=>{
            state.name = action.payload
        },
        emailChange: (state, action)=>{
            state.email = action.payload
        }
    },
})

export const userDetails = (state)=>state.user
export const{addFile, nameChange, emailChange}= userSlice.actions;
export default userSlice.reducer;