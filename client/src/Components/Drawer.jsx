import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "./redux/UserSlice";

const ProfileDrawer =(selectedFile)=> {
  const userdetails = useSelector(userDetails)
  // console.log(userdetails)
    
  const [open, setOpen] = useState(false);
  
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
    return(
      <div className="">
        { !userdetails.profilePic ?
        <FontAwesomeIcon 
          icon={faUserCircle} 
          onClick={openDrawerRight} 
          className='text-2xl text-white' 
          /> :
          <Avatar src={userdetails.profilePic} size='sm' onClick={openDrawer}/>
          }

        <Drawer
          placement="right"
          open={open}
          onClose={closeDrawer}
          className="p-4 bg-blue-900"
        >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="white" >
            User Profile
          </Typography>
          <IconButton
            variant="text"
            color="white"
            onClick={closeDrawer}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="">
                <div className='flex flex-col'>
                    {/* Menu content */}<Link to='/profile' className="text-center" onClick={closeDrawer}>
                    { userdetails.profilePic ? 
                      <Avatar src={userdetails.profilePic} size='xl' className=' self-center'/> : <FontAwesomeIcon icon={faUserCircle} className='text-5xl mt-6 text-white mb-1'/>}
                      <h3 className="text-white font-semibold text-center">{userdetails.name}</h3>
                      <small className={`text-xs text-center text-gray-400 ${!userdetails.name && ' hidden'}`}>{userdetails.role}</small>
                      </Link> 
                    {/* would be dynamic: user's level would be fetched from backend */}
                    <nav className="mt-2 divide-y divide-slate-600">
                        {
                        userdetails.name ?
                        <>
                          <NavLink to='/profile' onClick={closeDrawer} className="block py-2.5 px-4 text-base font-medium text-white hover:bg-white hover:text-blue-900 "
                          >
                              Profile
                          </NavLink>
                          <NavLink to='/write' onClick={closeDrawer} className="block py-2.5 px-4 text-base font-medium text-white hover:bg-white hover:text-blue-900"
                          >
                                  Write   
                          </NavLink>
                          <NavLink to='#' onClick={closeDrawer} className="block py-2.5 px-4 text-base font-medium text-white hover:bg-white hover:text-blue-900"
                          >
                                  Become an Author
                                  {/* would be dynamic: would determined based on user's current level  */}
                          </NavLink>
                        </> : 
                        <>
                          <NavLink to='/login' onClick={closeDrawer} className="block py-2.5 px-4 text-base font-medium text-white hover:bg-white hover:text-blue-900"
                            >
                                Login   
                          </NavLink>
                          <NavLink to='/signup' onClick={closeDrawer} className="block py-2.5 px-4 text-base font-medium text-white hover:bg-white hover:text-blue-900"
                          >
                                  Sign Up
                                  {/* would be dynamic: would determined based on user's current level  */}
                          </NavLink>
                        </>
                        }
                    </nav>
                </div>
            </div>
            <footer className={`absolute bottom-0 left-0 right-0 ${!userdetails.name && 'hidden'} `}>
                <div className='flex flex-col pb-2'>
                    <div className='text-white text-center'>
                        {
                          userdetails.name ? <button className="hover:text-white hover:font-semibold" >Log Out</button>
                          :
                          <NavLink to='/login'>Login</NavLink>
                        }
                    </div>
                    <small className='text-center text-gray-400'>{userdetails.name}</small>
                    {/* would be dynamic */}
                </div>
            </footer>
      </Drawer>
       
      </div>
    )
}

export default ProfileDrawer