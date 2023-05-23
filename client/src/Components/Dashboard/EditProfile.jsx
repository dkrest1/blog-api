import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts } from '../redux/PostsSlice'
import ProfileAvatar from './ProfilePic'
import { userDetails } from '../redux/UserSlice'
import { nameChange, emailChange } from '../redux/UserSlice'
import { Button } from '@material-tailwind/react'

export const RenderMeTab = ()=>{
    const userdetails = useSelector(userDetails)
    const postArray = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    // console.log(userdetails.profilePic)

    useEffect(()=>{
        localStorage.setItem('userName',userdetails.name)
        localStorage.setItem('userEmail',userdetails.email)
    },[userdetails.name, userdetails.email])
    return(
      <div className=' animate-swipeInRight'>
        <div className='flex flex-col divide-y gap-5'>
          <div className='flex flex-col mt-3 items-center'>
            {!userdetails.profilePic ? <p className='text-sm text-gray-500'>Click to upload Profile image</p> :<p className='text-sm text-gray-300'>Click to change profile image</p>}
            <ProfileAvatar/>
            <p className='text-lg -mb-2 text-gray-800 font-semibold mt-3'>{userdetails.name}</p>
            <small className='text-xs text-gray-600'>{userdetails.email}</small>
            <div>
              <p ><span className='font-medium text-sm'>{postArray.length}</span> <span className='text-sm text-slate-600'> Posts</span></p>
            </div>
          </div>
          <div className='pt-5'>
            <form>
              <div className='flex flex-col '>
                <label className='text-xs'>Name</label>
                <input type='text' minLength={2} maxLength={25}
                  className=' border-b focus:border-b-2 focus:border-blue-600' 
                required value={userdetails.name} 
                onChange={(event)=>{
                    dispatch(
                        nameChange(
                     event.target.value))}}
                />
              </div> 
              <div className='flex flex-col mt-5'>
                <label className='text-xs'>Email address</label>
                <input type='email' 
                  className=' border-b focus:border-b-2 focus:border-blue-600' 
                required 
                value={userdetails.email} 
                onChange={(event)=>{
                    dispatch(
                        emailChange(event.target.value)
                    )
                }}
                />
              </div>     
              {/* <button className='bg-blue-600 text-white rounded px-3 mt-4'> Update</button>          */}
            </form>
          </div>
          <div className=' mt-5 pt-3'>
            {
                userdetails.role === 'subscriber' ?<> 
                <p className='text-base text-gray-900'>Want to publish stories? Request to be an Author</p>
                <Button variant='filled' className='mt-2'>Become an Author</Button></> : 
                userdetails.role === 'author' ?  <>
                    <p className='text-base text-gray-900'>Want to be able to moderate and regulate the space? Request to be a Moderator</p>
                <Button variant='filled' className='mt-2'>Become an Moderator</Button> </> : ""
            }
          </div>
          <div className='flex flex-col mt-3 gap-4 pt-3'>
            <button className='flex flex-col items-start'>
                <p className='text-base text-red-700'>Deactivate Account</p>
                <p className='text-xs text-start'>Deactivating Account will suspend your account until you sign back in</p>
            </button>
            <button className='flex flex-col items-start'>
                <p className='text-base text-red-700'>Delete Account</p>
                <p className='text-xs text-start'>Permanetly delete your account and all your published contents</p>
            </button>
          </div>
        </div>
    </div>
    )   
  }