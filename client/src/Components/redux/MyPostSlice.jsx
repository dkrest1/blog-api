import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mypost: null
}

export const myPostSlice = createSlice({
    name: 'myposts',
    initialState,
    reducers:{
        getMyPosts: (state, action)=>{
            state.mypost = action.payload
        }
    }
})

export const userPost = (state)=>state.myPost.mypost
export const {getMyPosts} = myPostSlice.actions
export default myPostSlice.reducer