import React, { useState, useRef, useEffect } from "react";
import {useClickAway} from 'react-use'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "../Auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import Posts from "./Posts";
import AvatarUploader from "./ProfilePic";
import { userDetails } from "../redux/UserSlice";
import { selectAllPosts } from "../redux/PostsSlice";
import FloatingButton from "./FloatingButton";

export default function Dashboard() {
  const userdetails = useSelector(userDetails)
  const postArray = useSelector(selectAllPosts)
  // console.log(postArray)
  const [isOpen, setIsOpen] = useState(false);
  
  const ref = useRef(null);
  useClickAway(ref,()=>{
    setIsOpen(false);
  });


  const handleSearchSubmit = (event)=>{
    event.preventDefault()
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      {userdetails.name ? 
      <>
        <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="flex justify-between bg-white shadow-md rounded-lg px-4 py-3">
            <p className="text-gray-700 md:text-2xl">Latest Posts</p>
            <div>
              <form onSubmit={handleSearchSubmit}>
                <input 
                className=' w-[120px] md:w-[400px] h-5 md:h-8 text-xs md:text-lg p-1 md:p-2 border-collapse border-b-2'
                type='search' 
                id='search'
                placeholder="search here..."
                />
                {/* <button type="submit">
                  <FontAwesomeIcon icon={faSearch} className='text-base md:text-lg -ml-6 md:-ml-12 text-gray-600' />
                </button> */}
              </form>
            </div>
            <div className="">
              <NavLink to='/write' className=' text-blue-gray-800 text-sm md:text-xl '>
                <span><FontAwesomeIcon icon={faPencilSquare} className='text-blue-gray-800 mr-1 md:mr-2'/>Post</span> 
              </NavLink>
            </div>
          </div>
          <Posts postArray={postArray}/>
          <div className="border-2 h-12 md:hidden">
            <FloatingButton/>
          </div>
        </main>
      </> : <Login/>}
    </div>
    
  )}
