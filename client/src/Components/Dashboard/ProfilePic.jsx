import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFile, userDetails } from '../redux/UserSlice';
import { user } from '../redux/UserDataSlice';
import { token } from '../redux/AccessTokenSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import FormData from 'form-data';
// import { userDetails } from '../redux/UserSlice';

const ProfileAvatar = () => {
    const userdetails = useSelector(userDetails)
    const userData = useSelector(user)
    const accessToken = useSelector(token)
    // console.log(userData)
    // console.log(userdetails.profilePic)
    const dispatch = useDispatch()
    const params = new URLSearchParams()
    // const user = useSelector((state)=>state.user.name)
    const fileInputRef = React.createRef();
    let status
    const notify=()=> toast(status)

  // const FormData = require('form-data')
  const formData = new FormData()
  const headers ={
    Authorization : `Bearer ${accessToken}`,
    'Content-type': 'multipart/form-data'
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const imageFile = URL.createObjectURL(file)
    dispatch(addFile(imageFile))
    formData.append('file', imageFile)

    axios.post('http://localhost:3000/image/upload/avatar', formData, {headers})
    .then((response)=>{
      console.log(response)
      if(response.statusText==='Created'){
        status ='Profile pic uploaded successfully'
        notify()
      }
    })
    .catch((error)=>{
      console.log(error)
      status='Error uploading profile pic'
      notify()
    })
  };

  useEffect(()=>{
    axios.get('http://localhost:3000/image/view/avatar?folder=avatars&filename=187799c0-d512-4f60-87b7-54d059f18883.webp', {headers})
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
  })
 
  useEffect(()=>{
    localStorage.setItem('profilePic', userdetails.profilePic)
  },[userdetails.profilePic])

  const handleAvatarClick = () => {
    // Trigger click event on the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


// localStorage.removeItem('profilePic')
  return (
    <div>
      <ToastContainer/>
        <div>
            <FontAwesomeIcon icon={faUserCircle} onClick={handleAvatarClick} className={`text-7xl text-gray-700 ${userdetails.profilePic  && 'hidden'}`}/>
            <Avatar src={userdetails.profilePic} size='xl' onClick={handleAvatarClick} className={`${!userdetails.profilePic && 'hidden'} md:w-44 md:h-44`}/>
        </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ProfileAvatar;
