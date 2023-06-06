import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    post: null
}

export const postSlice = createSlice({
    name: 'serverPost',
    initialState,
    reducers: {
        getPosts: (state, action)=>{
            state.post = action.payload
        }
    }
})

export const post = (state)=>state.postData.post
export const {getPosts} = postSlice.actions
export default postSlice.reducer