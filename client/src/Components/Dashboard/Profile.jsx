import React from 'react'
import { useState } from 'react'
import {NavLink } from 'react-router-dom'
import TopMenu from '../TopMenu'
import Posts from './Posts'
const Profile = () => {
  const [postActive, setPostActive] = useState(true)
  const [BookmarkActive, setBookmarkActive] =useState(false)

  const handlePostClick = ()=>{
    setPostActive(true)
    setBookmarkActive(false)
    // console.log("post page is active")
  }
  const handleBookMarkClick = ()=>{
    setPostActive(false)
    setBookmarkActive(true)
    // console.log("bookmark is active")
  }
  const TopNav =()=>{
    return(
      <nav className=' bg-slate-200'>
        <div className='relative'>
        <div className='flex flex-row mx-2'>
          <div className=''>
            <div className=' space-x-12'>
              <button
                onClick={handlePostClick}
                className={`${postActive ? 'border-b-4 border-slate-600 px-2 font-medium':''}`}>My Posts</button>
              <button
                onClick={handleBookMarkClick}
                className= {`${BookmarkActive ? 'border-b-4 border-slate-600 px-2 font-medium':''}`}>Bookmark</button>
            </div>
            </div>
          <div className='absolute right-0 mr-3'>
              <NavLink to='#'>Me</NavLink>
          </div>
          </div>
          </div>
      </nav>
    )
  }
  
  return (
    <div>
      <TopMenu/> 
      <TopNav/>
      <div>
        {/* {postActive ?  */}
          <div className={`mt-2 transition duration-500 ${!postActive && 'hid  en -translate-x-full'}`}>
            {postActive &&
            <div className='transition duration-500 translate-x-0'><Posts/></div>
          }
          </div> 
          <div className={` mt-2 text-center transform transition duration-500  ${!BookmarkActive && ' translate-x-full' }`}>
            <p>This BookMark Page</p></div>
            {/* } */}
      </div>   
    </div>
  )
}

export default Profile
