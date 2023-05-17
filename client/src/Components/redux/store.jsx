import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import postReducer from './PostsSlice'
import userPostReducer from './UserPostSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    userPost: userPostReducer,
  },
})