import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPenToSquare, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'
import TopMenu from '../TopMenu'
import Posts from './Posts'
// import { postArray } from './Posts'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts } from '../redux/PostsSlice'

export const RenderMeTab = ()=>{
  const user = useSelector((state)=>state.user.user)
  const postArray = useSelector(selectAllPosts)
  return(
    <div className=' animate-swipeInRight'>
      <div className='flex flex-col'>
        <div className='flex flex-col mt-3 items-center'>
          <FontAwesomeIcon icon={faUserCircle} className='text-6xl text-slate-600'/>
          {/* <img src='' alt="user's image"/> */}
          <p className='text-lg -mb-2 text-slate-900 font-medium'>{user}</p>
          <small className='text-xs text-slate-600'>user's email</small>
          <div>
            <p ><span className='font-medium text-sm'>{postArray.length}</span> <span className='text-sm text-slate-600'> Posts</span></p>
          </div>
        </div>
        
        <div>
          <form>
            <div className='flex flex-col'>
              <label className='text-xs'>Name</label>
              <input type='text' minLength={2} maxLength={25}
                className=' border-b focus:border-b-2 focus:border-blue-600' 
              required value={user} 
              onChange={(event)=>event.target.value}
              />
            </div> 
            <div className='flex flex-col mt-5'>
              <label className='text-xs'>Email address</label>
              <input type='email' 
                className=' border-b focus:border-b-2 focus:border-blue-600' 
              // required value={} onChange={}
              />
            </div>     
            <button className='bg-blue-gray-600 text-white rounded px-3 mt-4'> Update</button>         
          </form>
        </div>
      </div>
  </div>
  )   
}
const Profile = () => {
  // console.log(postArray)
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
                className={`${postActive ? 'border-b-4 border-slate-600 px-2 font-medium':''}`}>My Posts
                  <FontAwesomeIcon icon={faPenToSquare} className='text-slate-600 text-sm ml-1'/>
                </button>
              <button
                onClick={handleBookMarkClick}
                className= {`${BookmarkActive ? 'border-b-4 border-slate-600 px-2 font-medium':''}`}>Bookmarks
                  <FontAwesomeIcon icon={faBookmark} className='text-slate-600 font-extralight text-sm ml-1'/>
                </button>
            </div>
            </div>
          <div className='absolute right-0 mr-3'>
              <button onClick={handleMeClick}
                className={`${meActive ? 'border-b-4 border-slate-600 px-2 font-medium' : ''}`}
              >Me
                <FontAwesomeIcon icon={faUser} className='text-sm ml-1 text-slate-600'/>
              </button>
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
  

  return (
    <div className=''>
      <TopMenu/> 
      <TopNav/>
      <div className='m-1'>
         {
          postActive ? <div className=' '><RenderPostTab/></div> : BookmarkActive ? <div><RenderBookmarkTab/></div> : meActive && <div> <RenderMeTab/></div>
         }
      </div>
    </div>
  )
}

export default Profile
