import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useState } from 'react';
// import {useClickAway} from 'react-use'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const SideMenu = ({isOpen, setIsOpen}) => {
  const user = useSelector((state)=>state.user.user)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle the menu */}
      <button
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faUserCircle} className='text-2xl text-slate-200'/>
      </button>

      {/* The menu */}
        <div
            className={`fixed max-h-screen z-50 inset-y-0 right-0 w-64 bg-gray-800 overflow-y-auto transition duration-300 transform ${
            !isOpen ? 'translate-x-full ease-out' : '-translate-x-0 ease-in'
            }`}
        >
            <div>
                {/* Close button */}
                <button
                className="absolute top-0 right-0 px-4 py-3 text-white hover:text-gray-500 focus:outline-none"
                onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </button>
                <div className='flex flex-col'>
                    {/* Menu content */}
                    <FontAwesomeIcon icon={faUserCircle} className='text-5xl mt-6 text-white mb-1'/>
                    <small className='text-xs text-center text-slate-400'>subscriber</small> 
                    {/* would be dynamic: user's level would be fetched from backend */}
                    <nav className="mt-2 divide-y divide-slate-600">
                        <NavLink to='/profile' className="block py-2.5 px-4 text-base font-medium text-white hover:bg-gray-800"
                        >
                            Profile
                        </NavLink>
                        <NavLink to='/write' className="block py-2.5 px-4 text-base font-medium text-white hover:bg-gray-800"
                        >
                                Write   
                        </NavLink>
                        <NavLink to='#' className="block py-2.5 px-4 text-base font-medium text-white hover:bg-gray-800"
                         >
                                Become an Author
                                {/* would be dynamic: would determined based on user's current level  */}
                        </NavLink>
                    </nav>
                </div>
            </div>
            <footer className='absolute bottom-0 left-0 right-0 '>
                <div className='flex flex-col'>
                    <button className='text-white'>
                        Log out
                    </button>
                    <small className='text-center text-slate-400'>{user}</small>
                    {/* would be dynamic */}
                </div>
            </footer>
        </div>
    </>
  );
};

export default SideMenu;
