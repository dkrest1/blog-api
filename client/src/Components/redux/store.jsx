import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
// import postReducer from './PostsSlice'
import userPostReducer from './UserPostSlice'
import tokenReducer from './AccessTokenSlice'
import userDataReducer from './UserDataSlice'
import postDataReducer from './PostSlice'
import myPostReducer from './MyPostSlice'
import pendingReducer from './PendingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    // post: postReducer,
    userPost: userPostReducer,
    accessToken: tokenReducer,
    userData: userDataReducer,
    postData: postDataReducer,
    myPost: myPostReducer,
    pending : pendingReducer,
  },
})