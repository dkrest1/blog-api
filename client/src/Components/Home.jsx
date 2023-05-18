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
import { userDetails } from './redux/UserSlice';
const Home =()=> {
    const userdetails = useSelector(userDetails)
    const handleRegister =()=>{
    // const [selectedFile, setSelectedFile] = useState(initialState);

        return
    }
  return (
    <div className='flex flex-col min-h-screen' >
        <div className=' flex flex-1 flex-col items-center  bg-slate-50 h-80 p-1'>
            <section className='flex flex-1 flex-col md:flex md:flex-row items-center bg-gray-8 my-3'>
                <img className=' h-40 w-auto md:h-48 ' src={blog} alt='blog image'/>
                <div className='flex flex-col items-center'>
                    <div className=' text-center  font-serif mt-5 mb-5 mx-10 md:text-xl md:ml-2'><p className=' text-center -mb-8 text-base text-blue-800'>You want</p> <br/><span className='text-4xl font-extrabold text-blue-900'>lastest and Top Trending Stories</span><span className='text-xl text-blue-800 '> in and outside the tech space?</span>
                    </div>
                    {!userdetails.name ?
                    <> 
                    <p className='text-slate-600 text-sm mb-2'>Register / Login to start creating your stories</p>
                    <div className='md:flex md:flex-row md:mt-3 md:gap-3'>
                        <Link to='/sign-up'><button className=' bg-slate-300 text-gray-800 hover:ring-2 hover:ring-slate-300 hover:bg-slate-700 hover:text-slate-200 font-semibold rounded-md px-4 py-1 mr-5 md:text-lg md:ml-6 md:px-8'
                        >Register</button></Link>
                        <Link to='/login'><button className='bg-slate-300 text-gray-800 hover:ring-2 hover:ring-slate-300 font-semibold hover:bg-slate-700 hover:text-slate-200 rounded-md px-5 py-1 md:text-lg md:px-10 '
                        >Login</button></Link>
                    </div>  
                    </>
                    :
                    <>
                        <div className='flex flex-col items-center bg-gray-50 mx-7 p-4 border2 rounded-lg'>
                            <h3 className='text-xl font-medium text-light-blue-700'>Diversity</h3>
                            <p className='text-gray-600 mb-2 mt-1'>
                        Discover a diverse array of topics in our blog. Dive into the fascinating world of science and technology, where we explore groundbreaking innovations and discuss their impact on society.
                            </p>
                            <Link to='/login' className='p-2 px-10 bg-blue-600 text-white text-base rounded'>Get Started</Link>
                        </div>
                        <div className='text-center my-8'>
                            <FontAwesomeIcon icon={faUsers} className='text-[70px] text-light-blue-900  '/>
                            <p className='text-lg text-gray-500'>All you need in one place</p>
                        </div>
                    </>
                    }
                    <div className='flex flex-col my-5'>
                        <Typography variant='h6' className='text-gray-600'>Check out the latest trending blog stories  </Typography>
                        <NavLink to='/dashboard' className='text-center'>
                            <Button variant='outlined' className='py-2'>Top Stories</Button>
                        </NavLink>
                    </div>
                    <div className=' flex flex-col items-center my-4 px-2'>
                        <Typography variant='h3' className='text-blue-800'>
                            Community
                        </Typography>
                        <img src={community} />
                        <Typography variant='h6' className='text-gray-600 text-center'>
                            Spring your inspiration from the experiences of likeminds
                        </Typography>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
} 

export default Home;
