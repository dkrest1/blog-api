import React from 'react'
import Navbar from './Navbar';
import blog from '../Assets/Images/blog3.png'
import community from '../Assets/Images/community.png'
import { Login } from './Auth/Login';
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-tailwind/react';
import { user } from './redux/UserDataSlice';
import { token } from './redux/AccessTokenSlice';
const Home =()=> {
    const accessToken = useSelector(token)
    const userData = useSelector(user)
    // console.log(userData)
    // console.log(accessToken)
  return (
    <div className='flex flex-col -mt-3 w-full' >
        <div className=' flex flex-1 flex-col items-center bg-slate-50 h-80 p-0'>
            <section className='flex w-full flex-1 flex-col sm:items-center md:items-start bg-gray-8 my-3'>
                <div className='hidden w-full bg-gradient-to-r from-red-500 to-indigo-500 md:flex md:flex-row md:justify-start md:items-end md:gap-8 md:py-3'>
                    <img className=' h-40 w-auto md:h-64  ' src={blog} alt='blog image'/>
                    <p className='hidden md:inline-flex md:self-end md:text-6xl md:font-bold md:text-blue-800 md:tracking-[.25em]'>MY BLOG</p>
                </div>
                <div className="flex flex-col md:mt-10">
                    <div className='  font-serif mt-5 mb-5 mx-10 md:text-xl md:ml-2'><p className='  md:text-start -mb-8 text-base  text-gray-800 md:text-3xl'>You want</p> <br/><span className='font-heading-1 text-4xl md:text-6xl font-extrabold text-gray-900 md:text-blue-900'>lastest and Top Trending Stories</span><span className='text-xl md:text-3xl text-gray-800'> in and outside the tech space?</span>
                    </div>
                    {!accessToken ?
                        <div className='flex flex-col items-center md:rounded md:px-8 md:py-6 md:border md:border-blue-100 md:mt-4'> 
                            <p className='text-slate-600 text-sm mb-2 md:text-4xl md:text- '>Register / Login to start creating your stories</p>
                            <div className='md:flex md:flex-row md:mt-3 md:gap-3'>
                                <Link to='/sign-up'><button className=' bg-blue-600 text-white hover:ring-2 hover:ring-blue-600 hover:bg-white hover:text-blue-600 font-semibold rounded-md px-4 py-1 mr-5 md:text-lg md:ml-6 md:px-8'
                                >Register</button></Link>
                                <Link to='/login'><button className='bg-blue-600 text-white hover:ring-2 hover:ring-blue-600 hover:bg-white hover:text-blue-600 font-semibold rounded-md px-4 py-1 mr-5 md:text-lg md:ml-6 md:px-8 '
                                >Login</button></Link>
                            </div>  
                        </div>
                    :
                    <>
                        <div className='flex flex-col items-center bg-gray-50 mx-7 p-4 border2 rounded-lg md:mt-16 md:gap-3'>
                            <h3 className='text-xl md:text-3xl font-medium text-blue-900'>Diversity</h3>
                            <p className='text-gray-600 mb-2 mt-1 md:text-xl md:px-5'>
                        Discover a diverse array of topics in our blog. Dive into the fascinating world of science and technology, where we explore groundbreaking innovations and discuss their impact on society.
                            </p>
                            <Link to='/login' className='p-2 px-10  md:text-2xl md:hover:bg-transparent md:hover:ring-1 md:hover:text-blue-900 md:hover:ring-blue-900 bg-blue-600 text-white text-base rounded'>Get Started</Link>
                        </div>
                        <div className='text-center my-8 md:my-14'>
                            <FontAwesomeIcon icon={faUsers} className='text-[70px] text-light-blue-900 md:text-[10rem] '/>
                            <p className='text-lg text-gray-500 md:mt-4 md:text-3xl'>All you need in one place</p>
                        </div>
                    </>
                    }
                    <div className='flex flex-col my-5 md:border md:rounded md: md:px-16 md:py-4 md:gap-4'>
                        <Typography variant='h6' className='text-blue-900 md:text-3xl '>Check out the latest trending blog stories  </Typography>
                        <NavLink to='/dashboard' className='text-center'>
                            <button  className='py-2 px-5 ring-1 ring-blue-900 rounded-md text-blue-900 hover:bg-blue-800 hover:ring-0 hover:text-white md:text-xl'>TOP STORIES</button>
                        </NavLink>
                    </div>
                    <div className=' flex flex-col items-center my-4 px-2 md:mt-10'>
                        <Typography variant='h3' className='text-blue-900 md:text-4xl md:uppercase'>
                            Community
                        </Typography>
                        <img src={community} />
                        <Typography variant='h6' className='text-gray-600 text-center md:text-2xl'>
                            Spring your inspiration from the experiences of writers with likeminds
                        </Typography>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
} 

export default Home;
