import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileAvatar from './ProfilePic'
import { Button } from '@material-tailwind/react'
import { user } from '../redux/UserDataSlice'
import { post } from '../redux/PostSlice'
import { token } from '../redux/AccessTokenSlice'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import { getUser} from '../redux/UserDataSlice'

export const RenderMeTab = ()=>{
    const userData = useSelector(user)
    const accessToken =useSelector(token)
    const [updateData, setUpdateData] = useState(
      {
        email: '',
        firstname: '',
        lastname: '',
        password: ''
      }
    )
    const dispatch = useDispatch()

    const handleInputChange=(event)=>{
      const {name, value} = event.target
      setUpdateData((prevValues)=>({...prevValues, [name]: value}))
    }
    let updates={
      ...(updateData.email && {email : updateData.email}),
      ...(updateData.firstname && {firstname : updateData.firstname}),
      ...(updateData.lastname && {lastname : updateData.lastname}),
      ...(updateData.password && {password : updateData.password}),
    }
    const [updatedUser, setUpdatedUser] = useState(null)
    useEffect(()=>{
      if(!updatedUser){
        return
      }
      else{
      dispatch(getUser(updatedUser))
    }
    })
    let status
    const notify=()=>toast(status)
    const handleUpdateDetails = (event)=>{
      event.preventDefault()
      const headers={
        Authorization: `Bearer ${accessToken}`
      }
      axios.patch('http://localhost:3000/user/me', updates, {headers})
      .then((response)=>{
        if(response.statusText==='OK'){
          axios.get('http://localhost:3000/user/me', {headers})
          .then((response)=>{
            let data = response.data
            setUpdatedUser(data)
          })
          status = 'Profile updated successfully!'
          notify()
          setUpdateData({email:'', firstname:'', lastname:'', password:''})
        }
      })
      .catch((error)=>{
        console.log(error)
        status = "Something happened, couldn't update!"
        notify()
      })
    }

    return(
      <div className='px-1 md:px-3'>
        <ToastContainer/>
        <div className='flex flex-col divide-y gap-5'>
          <div className='flex flex-col mt-3 items-center md:-mb-3'>
            {userData && !userData.profilePicture ? 
              <p className='text-sm text-gray-500 md:text-lg'>
                <span className='md:hidden'>Tap</span><span className='hidden md:inline'>Click </span> to upload Profile image</p> :<p className='text-sm text-gray-300 md:text-lg'><span className='md:hidden'>Tap </span> <span className='hidden md:inline'>Click </span>to change profile image
              </p>
            }
            <ProfileAvatar/>
            <p className='text-lg -mb-2 text-gray-800 font-semibold mt-3 md:text-2xl'>{userData.firstname} {userData.lastname}</p>
            <small className='text-xs text-gray-600 md:mt-2 md:text-sm'>{userData.email}</small>
            <div>
              {/* <p ><span className='font-medium text-sm'>{postFetched.filter((post)=>post.user.firstname===userData.firstname).length}</span> <span className='text-sm text-slate-600'> Posts</span></p> */}
            </div>
          </div>
          <div className='pt-5 md:pt-11'>
            <form>
              <div className='flex flex-col '>
                <label className='text-xs md:text-base md:font-semibold'>Name</label>
                <div className='flex flex-row gap-6'>
                  <input type='text' minLength={2} maxLength={25}
                    name='firstname'
                    className=' w-32 md:w-64 border-b focus:border-b-2 focus:border-blue-600 md:focus:border-none md:text-lg text-gray-600' 
                    placeholder={userData.firstname}
                  required value= {updateData.firstname}
                  onChange={()=>handleInputChange(event)}
                  />
                  <input type='text' minLength={2} maxLength={25}
                    name='lastname'
                    className=' w-32 md:w-64 border-b focus:border-b-2 focus:border-blue-600 md:focus:border-none md:text-lg text-gray-600'
                    placeholder={userData.lastname}
                    value={updateData.lastname} 
                    required 
                    onChange={()=>handleInputChange(event)}
                  /> 
                </div>
              </div> 
              <div className='flex flex-col mt-5 '>
                <label className='text-xs md:text-base md:font-semibold'>Email address</label>
                <input type='email' 
                  name='email'
                  className='md:w-64 border-b focus:border-b-2 focus:border-blue-600 md:text-lg md:text-gray-600' 
                  required
                  placeholder={userData.email}
                  value= {updateData.email}
                  onChange={()=>handleInputChange(event)}
                />
              </div>  
              <div className='flex flex-col mt-5 '>
                <label className='text-xs md:text-base md:font-semibold'>Password</label>
                <input type='password'
                  name='password' 
                  className='md:w-64 border-b focus:border-b-2 focus:border-blue-600 md:text-lg md:text-gray-600' 
                  required
                  placeholder='new password'
                  value= {updateData.password}
                  onChange={()=>handleInputChange(event)}
                />
              </div>    
              {/* <button className='bg-blue-600 text-white rounded px-3 mt-4'> Update</button>          */}
              <button className='bg-blue-600 text-white px-4 mt-5 rounded'
                onClick={handleUpdateDetails}
                >
                  Update
              </button>
            </form>
          </div>
          <div className=' mt-5 pt-3 md:mt-10 md:pt-10'>
            {
                userData.role === 'subscriber' ?
                <> 
                  <p className='text-base text-gray-900 md:text-lg'>Want to publish stories? Request to be an Author</p>
                  <Button variant='filled' className='mt-2'>Become an Author</Button></> : 
                  userData.role === 'author' ?  
                <>
                  <p className='text-base text-gray-900 md:text-lg'>Want to be able to moderate and regulate the space? Request to be a Moderator</p>
                  <Button variant='filled' className='mt-2 md:mt-3'>Become an Moderator</Button> </> : ""
            }
          </div>
          <div className='flex flex-col mt-3 gap-4 pt-3'>
            {/* <button className='flex flex-col items-start'>
                <p className='text-base text-red-700 md:text-xl'>Deactivate Account</p>
                <p className='text-xs text-start md:text-sm'>Deactivating Account will suspend your account until you sign back in</p>
            </button> */}
            <button className='flex flex-col items-start'>
                <p className='text-base text-red-700 md:text-xl'>Delete Account</p>
                <p className='text-xs text-start md:text-sm'>Permanetly delete your account and all your published contents</p>
            </button>
          </div>
        </div>
    </div>
    )   
  }