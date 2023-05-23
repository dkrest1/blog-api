import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFile, userDetails } from '../redux/UserSlice';
// import { userDetails } from '../redux/UserSlice';

const ProfileAvatar = () => {
    const userdetails = useSelector(userDetails)
    // console.log(userdetails.profilePic)
    const dispatch = useDispatch()
    // const user = useSelector((state)=>state.user.name)
  const fileInputRef = React.createRef();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const imageFile = URL.createObjectURL(file)
    dispatch(addFile(imageFile))
  };
 
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
        <div>
            <FontAwesomeIcon icon={faUserCircle} onClick={handleAvatarClick} className={`text-7xl text-gray-700 ${userdetails.profilePic  && 'hidden'}`}/>
            <Avatar src={userdetails.profilePic} size='xl' onClick={handleAvatarClick} className={`${!userdetails.profilePic && 'hidden'}`}/>
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
