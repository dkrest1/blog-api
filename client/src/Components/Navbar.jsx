import React, { useState } from 'react'
import logo from '../Assets/Images/logo.png'
// import code from '../Assets/Images/code.png'
import {NavLink, Link} from 'react-router-dom'
// import classNames from 'classNames'

 const Navbar =()=> {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu =()=>setIsOpen(false)
  return (
    <div>
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Toggle Menu Button*/}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleMenu}
                            >
                            {/* <span className="sr-only">Open main menu</span> */}
                            {isOpen ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to='/' className='' >
                                <span className=' text-slate-200 text-lg md:text-2xl md:font-bold'>&lt;/&gt;</span>
                                {/* <img
                                className="block lg:hidden h-8 w-auto"
                                src={logo}
                                alt="logo png"/> */}
                                <span className='text-lg text-slate-200 md:text-lg md:font-semibold'>My Tech Blog</span>
                            </Link>
                        </div>
                        {/* Menu for larger screens */}
                        <div className="hidden sm:block sm:ml-6  ">
                            <div className="flex space-x-4 md:items-center ">
                                <NavLink to ="/"
                                className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"} 
                                
                                >
                                Home
                                </NavLink>
                                <NavLink to ="/dashboard"
                                className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"}>
                                Dashboard
                                </NavLink>
                                <NavLink to ="/login"
                                className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"}>
                                Login
                                </NavLink>
                                <NavLink to ="sign-up"
                                 className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"}>
                                Sign Up
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    {/* Button for notifications */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6   sm:pr-0">
                        <NavLink to='/dashboard'>
                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-2"
                                >
                                {/* <span className="sr-only">View notifications</span> */}
                                <i className='fa fa-user'></i>
                            </button>
                        </NavLink>
                        <NavLink to='#'>
                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                <span className="sr-only">View notifications</span>
                                <i className='fa fa-bell'></i>
                            </button>
                        </NavLink>
                        
                        
                    </div>
                </div>
            </div>

      {/* Mobile Menu */}
            {isOpen && (
                <nav className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Home
                        </Link>
                        <Link to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Dashboard
                        </Link>
                        <Link to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Topics
                        </Link>
                        <Link to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Account
                        </Link>
                    </div>
                </nav>
                )}
        </nav>

    </div>
  )
}

export default Navbar;