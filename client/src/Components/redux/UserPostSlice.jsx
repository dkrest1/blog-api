import { createSlice, nanoid } from "@reduxjs/toolkit";
import storyImg from '../../Assets/Images/blog1.png'
 

const initialState = 
     [
        {
            // name: 'userPost',
            author: 'ayodeji',
            id: 1,
            title: "How I started Tech career",
            date: '23rd Jan, 2023',
            images: storyImg,
            content: `Tech is something always knew I was gonna do, and yes I'm glad I'm very much on my way to get fulfilling this dream.`,
            category: 'tech',
            likes: null,
            comments: null,
            bookmarked: false,
    },
]


export const userPostSlice = createSlice({
    name: 'userPost',
    initialState,
    reducers:{
        handleLikeButton: (state)=>{
            state.likeState = !state.likeState
        },
        postAdded:{ 
            reducer(state, action){
            state.push(action.payload)
            },
            prepare(title, content ){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        author:'Emma',
                        images: storyImg,
                        content,
                        date: 'today',
                        category:'rubbish'
                    } 
                }
            }
        }
    }
})

export const allUserPosts = (state)=>state.userPost
export const {handleLikeButton} = userPostSlice.actions
export const {postAdded} = userPostSlice.actions
export default userPostSlice.reducer