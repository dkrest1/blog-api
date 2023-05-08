import React, { useState, useRef } from 'react'
import { useClickAway } from 'react-use'
import logo from '../Assets/Images/logo.png'
// import code from '../Assets/Images/code.png'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

 const Navbar =({})=> {
    const user = useSelector((state)=>state.user.user)

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu =()=>setIsOpen(false)

    const ref = useRef(null)
    useClickAway(ref,()=>{
        // setIsOpen(false)
        closeMenu()
    })

    
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
                            {isOpen ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/>}
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
                                <NavLink to ="/login"
                                className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"}>
                                Login
                                </NavLink>
                                <NavLink to ="/sign-up"
                                className={({isActive, isPending})=> isActive ? " bg-gray-900 text-white font-bold text-lg p-2 rounded":"" ?isPending: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium md:text-lg"}>
                                Sign up
                                </NavLink>
                            </div>
                        </div>
                    </div>
                     {/* Button for notifications */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6   sm:pr-0">
                        {/* <NavLink to='/dashboard'>
                            <button
                                type="button"
                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-2"
                                >
                        
                                <FontAwesomeIcon icon={faBell} className=' text-[19px]'/><span className=' text-[8px] text-slate-50 bg-red-700 rounded-full px-[3px] absolute left-2 top-6'>2</span>
                            </button>
                        </NavLink> */}
                    </div>
                </div>
            </div>

      {/* Mobile Menu */}
                <nav ref={ref}
                className={`sm:hidden fixed max-h-screen z-50 inset-y-0 left-0 top-16 w-64 bg-gray-800 overflow-y-auto transition duration-500 transform ${
                    isOpen ? 'translate-x-0 ease-in' : ' transform -translate-x-full ease-out'
                    }`}>    
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Home
                        </Link>
                        {user && (
                        <Link to="/dashboard"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Dashboard
                        </Link>
                         )} 
                        {!user &&(<>
                        <Link to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Login
                        </Link>
                        <Link to="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
                            Sign up
                        </Link>
                        </>)}
                    </div>
                </nav>
        </nav>

    </div>
  )
}

export default Navbar;