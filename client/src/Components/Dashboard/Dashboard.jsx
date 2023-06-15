import React, { useState, useRef, useEffect } from "react";
import {useClickAway} from 'react-use'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import Posts from "./Posts";
import { user } from "../redux/UserDataSlice";
import { token } from "../redux/AccessTokenSlice";
import { getPosts } from "../redux/PostSlice";
import { post } from "../redux/PostSlice";
import FloatingButton from "./FloatingButton";
import SearchBox from "./SearchBox";
import UseGet from "../UseGet";
import { toast, ToastContainer } from "react-toastify";

export default function Dashboard() {
  const accessToken = useSelector(token)
  const postFetched = useSelector(post)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);

  const {fetchedData, isPending, setIsPending} = UseGet("http://localhost:3000/post?page=1&limit=0", accessToken)
  useEffect(()=>{
      fetchedData &&(
      dispatch(getPosts(fetchedData)),
      setIsPending(false)
      )
  },[fetchedData])

  const ref = useRef(null);
  useClickAway(ref,()=>{
    setIsOpen(false);
  });

  const [searchItem, setsearchItem] = useState('')
  const [filtered, setFiltered] = useState([])
  const [searchError, setSearchError] = useState('')
  const notify = ()=>toast(searchError)

  const handleInputChange =(event)=>{
    setsearchItem(event.target.value)
  }
  const handleSearchSubmit =(event)=>{
    event.preventDefault()
    if(searchItem===''){
      setFiltered([])
    } else if(filteredItem.length < 1 ){
      setSearchError("No matched post")
      notify()
    }
    else{
      setFiltered(filteredItem)
    }
  }
  let filteredItem
  if (searchItem){
  filteredItem = postFetched.filter((obj)=>{
    let searched = obj.title.toLowerCase().includes(searchItem.toLowerCase()) || obj.content.toLowerCase().includes(searchItem.toLowerCase()) || obj.user.firstname.toLowerCase().includes(searchItem.toLowerCase()) || obj.user.lastname.toLowerCase().includes(searchItem.toLowerCase())
    return(searched)
})
  }
  
  return (
    <div className="bg-gray-200 md:w-full">
      {/* {accessToken ? 
      <> */}
        <main className="max-w-7xl mx-auto md:max-w-full md:mx-0 py-2 md:px-2 ">
          <ToastContainer/>
          <div className="md:w-full md:flex md:flex-col md:items-center">
            <div className="flex justify-between bg-white shadow-md rounded-lg px-4 py-3 md:w-[80%]">
              <p className="text-gray-700 md:text-2xl">Latest Posts</p>
              <div>
                {/* <SearchBox/> */}
                <form onSubmit={handleSearchSubmit}>
                  <input 
                    className=' w-[120px] md:w-[400px] h-5 md:h-8 text-xs md:text-lg p-1 md:p-2 border-collapse border-b-2'
                    type='search' 
                    id='search'
                    placeholder="search here..."
                    value={searchItem}
                    onChange={handleInputChange}
                  />
                </form>
              </div>
              <div className="">
                <NavLink to='/write' className=' text-blue-gray-800 text-sm md:text-xl '>
                  <span><FontAwesomeIcon icon={faPencilSquare} className='text-blue-gray-800 mr-1 md:mr-2'/>Post</span> 
                </NavLink>
              </div>
            </div>
          </div>
          <div className="w-screen md:w-full md:px-1">
            { 
              filtered.length > 0 ?
                <SearchBox filtered={filtered} /> 
                :
                <Posts postFetched={postFetched} isPending={isPending}/> 
            }
          </div>
          <div className="border-2 h-12 md:hidden">
            <FloatingButton/>
          </div>
        </main>
      {/* </> : gotoLogin()} */}
    </div>    
  )
}
