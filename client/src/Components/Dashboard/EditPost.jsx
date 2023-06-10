import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus,  } from '@fortawesome/free-solid-svg-icons'
import { user } from '../redux/UserDataSlice'
import { post } from '../redux/PostSlice'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { token } from '../redux/AccessTokenSlice'
import { useSelector } from 'react-redux'
import { PhotoIcon } from '@heroicons/react/24/solid'
import UseGet from '../UseGet'
import Subscriber from './Subscriber'

export const EditPost = () => {
    const {id} = useParams()
    const accessToken = useSelector(token)
    let edit = JSON.parse(localStorage.getItem('editPost'))
    const userData = useSelector(user)
    const navigateTo = useNavigate();
    const [postValues, setPostValues] = useState({
      title: edit ? edit.title : '',
      content: edit ? edit.content : '' ,
      published: false
    })
    useEffect(()=>{
      if(!accessToken){
        const gotoLogin =()=>{
          navigateTo('/login')
        }
      gotoLogin()
      }
    })
    const handleInputChange =(event)=>{
        const {name, value} = event.target
        setPostValues((prevValues)=>({...prevValues, [name]: value}))
      }
      let status
      const notify =()=> toast(status)

      const onPublishPost =(event)=>{
        event.preventDefault()
        if(!postValues.title && !postValues.content){
          console.log('Title or Content cannot be empty!')
          }else{
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json',
          } 
          axios.patch(`http://localhost:3000/post/${id}`, postValues, {headers})
          .then((response)=>{
            if(response.statusText='OK'){
              status='Post updated successfully!'
              notify()
              setPostValues({title:'', content:''})
              setTimeout(() => {
                navigateTo('/dashboard')
              }, 2000);
            }
          })
          .catch((err)=>{
            console.log(err)
            status="Something happened, couldn't update post."
            notify()
          })
      }
    }
      const fileInputRef = React.createRef();
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-2">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Edit Post
            </h2>
            <ToastContainer/>
          </div>
          <div className='text-end'>
            <button
                onClick={onPublishPost} 
                className=" items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {/* <PlusIcon className="w-5 h-5 mr-2" /> */}
                <FontAwesomeIcon icon={faPenToSquare} className="px-1" />
                Update
                </button>
          </div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-base font-bold text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={postValues.title}
                  onChange={handleInputChange}
                  className="mt-1 font-semibold focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-base font-bold text-gray-700"
                >
                  Body
                </label>
                <div>
                  <textarea className="w-full text-sm h-32 border-b-2"
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
      </div>
    </div>
  )
}
