import { createSlice, nanoid } from "@reduxjs/toolkit";
import storyImg from '../../Assets/Images/blog1.png'
 

const initialState = 
     {
            title: "",
            content: '',
    }



export const userPostSlice = createSlice({
    name: 'userPost',
    initialState,
    reducers:{
        postAdded:{ 
            reducer(state, action){
            state.push(action.payload)
            },
            prepare(title, content ){
                return{
                    payload: {
                        title,
                        content,
                    } 
                }
            }
        }
    }
})

export const fetchPosts = (state)=>state.userPost
export const {postAdded} = userPostSlice.actions
export default userPostSlice.reducer