import React, { useState, useEffect } from 'react'
// import { selectAllPosts } from '../redux/PostsSlice'
// import { userDetails } from '../redux/UserSlice'
import { useSelector, useDispatch } from 'react-redux'
import Posts from './Posts'
import FloatingButton from './FloatingButton'
import UseGet from '../UseGet'
import { userPost } from '../redux/MyPostSlice'
import { getMyPosts } from '../redux/MyPostSlice'

const UserPost = ({accessToken}) => {
    const myPost = useSelector(userPost)
    const dispatch = useDispatch()
    const {fetchedData, isPending, setIsPending} = UseGet("http://localhost:3000/post/me", accessToken,)
    useEffect(()=>{
      dispatch(getMyPosts(fetchedData))
      setIsPending(false)
    },[fetchedData])

  return (
    <div>
      {
        myPost && myPost.length<1 ?
        <p className='text-base'>You have not written any post yet. Click the button below to start writing your stories</p>
      :
        <Posts postFetched={myPost} isPending={isPending}  />
      }
      <div>
        <FloatingButton/>
      </div>
    </div>
  )
}

export default UserPost
