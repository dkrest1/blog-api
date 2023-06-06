import React, { useState, useEffect } from 'react'
import { selectAllPosts } from '../redux/PostsSlice'
import { userDetails } from '../redux/UserSlice'
import { useSelector, useDispatch } from 'react-redux'
import Posts from './Posts'
import FloatingButton from './FloatingButton'
import UseGet from '../UseGet'
import { userPost } from '../redux/MyPostSlice'
import { getMyPosts } from '../redux/MyPostSlice'

const UserPost = ({accessToken}) => {
    const userdetails = useSelector(userDetails)
    // const postArray = useSelector(selectAllPosts)
    const myPost = useSelector(userPost)
    const dispatch = useDispatch()
    const {fetchedPosts, isPending, setIsPending} = UseGet("http://localhost:3000/post/me", accessToken, 'myPost')

    useEffect(()=>{
      dispatch(getMyPosts(fetchedPosts))
      setIsPending(false)
    },[fetchedPosts])
    console.log(isPending)
    console.log(myPost)

  return (
    <div>
      {
      //  userdetails.name === postArray.author &&
        // <Posts postArray={postArray.filter((post)=>post.author===userdetails.name)} />
        <Posts postFetched={myPost} isPending={isPending}  />
        
        
      }
      <div>
        <FloatingButton/>
      </div>
    </div>
  )
}

export default UserPost
