import { set } from 'immutable'
import React from 'react'
import { useState } from 'react'
import {NavLink } from 'react-router-dom'
import TopMenu from '../TopMenu'
import Posts from './Posts'
const Profile = () => {
  const [postActive, setPostActive] = useState(true)
  const [BookmarkActive, setBookmarkActive] =useState(false)
  const [meActive, setMeActive] = useState(false)

  const handlePostClick = ()=>{
    setPostActive(true)
    setBookmarkActive(false)
    setMeActive(false)
    // console.log("post page is active")
  }
  const handleBookMarkClick = ()=>{
    setPostActive(false)
    setMeActive(false)
    setBookmarkActive(true)
    // console.log("bookmark is active")
  }
  const handleMeClick =()=>{
    setPostActive(false)
    setBookmarkActive(false)
    setMeActive(true);
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
                className= {`${BookmarkActive ? 'border-b-4 border-slate-600 px-2 font-medium':''}`}>Bookmarks</button>
            </div>
            </div>
          <div className='absolute right-0 mr-3'>
              <button onClick={handleMeClick}
                className={`${meActive ? 'border-b-4 border-slate-600 px-2 font-medium' : ''}`}
              >Me</button>
          </div>
          </div>
          </div>
      </nav>
    )
  }
  const RenderBookmarkTab = ()=>{
    return(
        <div className='text-center animate-swipeInRight'>
          <p>This is bookmark tab</p>
        </div>
    )
  } 
  const RenderPostTab = ()=>{
    return(
      <div className=' animate-swipeInLeft'>
        <Posts/>
      </div>
    )
  }
  const RenderMeTab = ()=>{
    return(
      <div className=' animate-swipeInRight text-center'>
      <p>This is Me tab</p>
      <p>This is Me tab</p>
      <p>This is Me tab</p>
      <p>This is Me tab</p>
    </div>
    )   
  }

  return (
    <div className=''>
      <TopMenu/> 
      <TopNav/>
      <div>
         {
          postActive ? <div className=' '><RenderPostTab/></div> : BookmarkActive ? <div><RenderBookmarkTab/></div> : meActive && <div> <RenderMeTab/></div>
         }
      </div>
    </div>
  )
}

export default Profile
