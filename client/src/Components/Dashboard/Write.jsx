import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
// import { allUserPosts } from "../redux/UserPostSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from "@material-tailwind/react";
// import { userDetails } from "../redux/UserSlice";
import Subscriber from "./Subscriber";
// import { selectAllPosts } from "../redux/PostsSlice";
import Posts from "./Posts";
import { PhotoIcon, } from "@heroicons/react/24/outline";
// import { addPost } from "../redux/PostsSlice";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { post } from "../redux/PostSlice";
import { user } from "../redux/UserDataSlice";

function WritingPage({accessToken}) {
  // const userPost = useSelector(allUserPosts)
  const userData = useSelector(user)
  const fetchedPost = useSelector(post)
  // console.log(postFetched)
  const dispatch = useDispatch()
  // const userdetails = useSelector(userDetails)
  // const postArray= useSelector(selectAllPosts)
    const navigateTo = useNavigate();
    const [postValues, setPostValues] = useState({
      // id: nanoid(),
      title: '',
      content: '',
      // published: false
    })

    const handleInputChange =(event)=>{
      const {name, value} = event.target
      setPostValues((prevValues)=>({...prevValues, [name]: value}))
    }

  const notify =()=> toast('Published successfuly')

  const onPublishPost =(event)=>{
    event.preventDefault()
    if(!postValues.title && !postValues.content){
      console.log('Title or Content cannot be empty!')
      }else{
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      } 
      axios.post("http://localhost:3000/post/create", postValues, {headers})
      .then((response)=>{
        // console.log(response)
        if(response.status===201){
          notify()
          setPostValues({title:'', content:''})
          // navigateTo('/dashboard')
        }
      })
      .catch((err)=>console.log(err))
  }
}
  
  const [storyImage, setStoryImage] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const imageFile = URL.createObjectURL(file)
    setStoryImage(imageFile)
  };

  const hanldeAddImage = () => {
    // Trigger click event on the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemoveImage =()=>{
    setStoryImage(null)
  }
  const fileInputRef = React.createRef();
  useEffect(()=>{
    if(!accessToken){
      const gotoLogin =()=>{
        navigateTo('/login')
      }
    gotoLogin()
    }
  })
  

  return (
    <div className="flex flex-col h-screen">
      
      {userData && userData.role !=='subscriber' ? 
        <Subscriber/>
      :
      <div className="flex-1 overflow-y-auto px-2">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Write a new post
            </h2>
            <ToastContainer/>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onPublishPost} 
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {/* <PlusIcon className="w-5 h-5 mr-2" /> */}
                <FontAwesomeIcon icon={faPlus} className="px-1" />
                Publish
              </button>
            </div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={postValues.title}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <div>
                  <textarea className="w-full h-32 border-b-2"
                  name='content'
                    value={postValues.content}
                    onChange={handleInputChange}
                  />
                </div>
                <button onClick={hanldeAddImage} className="flex flex-row gap-2"><span>Add Photos</span>
                    <PhotoIcon/>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                {storyImage &&
                  <div className='relative shadow-lg'>
                    <img src={storyImage} alt='blog-image' className=' object-fit rounded'/>
                    <button onClick={handleRemoveImage} className="absolute left-0 right-0 "> <FontAwesomeIcon icon={faTimes} className='text-gray-600'/> </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <Typography variant='h5'>Check Recent Posts</Typography>
        <Posts postFetched={fetchedPost} isPending={false} />
        </div> */}
      </div>
}
    </div>
  );
}

export default WritingPage;
