import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Posts from "./Posts";

export default function Dashboard() {
  const user = useSelector((state)=>state.user.user)

  const handleSearchSubmit = (event)=>{
    event.preventDefault()
  }
  const handleProfileClick=()=>{
    return
  }
  return (
    
    <div className="bg-gray-200 min-h-screen">
      {user ? <>
      {/* Header */}
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to='/' className='' >
                                <span className=' text-slate-200 text-xs md:text-2xl md:font-bold'>&lt;/&gt;</span>
                                <span className='text-xs text-slate-200 md:text-lg md:font-semibold'>My Tech Blog</span>
                            </Link>
                        </div>
                        <div className=" flex flex-row justify-between px-3 gap-4">
                          <div className="">
                            <NavLink to='#' className='text-slate-200 text-sm'>
                              Posts 
                            </NavLink>
                          </div>
                          <div>
                            <form onSubmit={handleSearchSubmit}>
                              <input 
                              className=' w-[90px] h-5 text-xs p-1'
                              type='search' 
                              id='search'
                              placeholder="search here..."
                              />
                              <button type="submit">
                                <FontAwesomeIcon icon={faSearch} className='text-base absolute top-6 right-9' />
                              </button>
                            </form>
                          </div>
                          <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                onClick={handleProfileClick}
                                className="bg-gray-800  rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white -mr-5"
                                >
                                <FontAwesomeIcon icon={faUserCircle} className=' text-xl'/>
                            </button>
                          </div>
                        </div> 
                    </div>
                </div>
            </div>
          </nav>
      {/* Main content */}
      <main className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg px-4 py-3">
          <p className="text-gray-700">Latest Posts</p>
        </div>
        <Posts/>
      </main>
      </> : <Login/>}
    </div>
    
  )}
