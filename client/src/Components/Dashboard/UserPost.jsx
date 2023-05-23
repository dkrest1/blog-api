import React, { useState } from 'react'
import { selectAllPosts } from '../redux/PostsSlice'
import { userDetails } from '../redux/UserSlice'
import { useSelector } from 'react-redux'
import Posts from './Posts'
import FloatingButton from './FloatingButton'

const UserPost = ({postArray}) => {
    const userdetails = useSelector(userDetails)
  return (
    <div>
      {
      //  userdetails.name === postArray.author &&
        <Posts postArray={postArray.filter((post)=>post.author===userdetails.name)} />
        
      }
      <div>
        <FloatingButton/>
      </div>
    </div>
  )
}

export default UserPost