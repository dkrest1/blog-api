import React from 'react'
import Navbar from './Navbar';
import blog from '../Assets/Images/blog3.png'
import { Login } from './Login';
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
const Home =({user})=> {
    const handleRegister =()=>{
        return
    }
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar user={user}/>
        <div className=' flex flex-1 flex-col items-center  bg-gray-900 h-80'>
            <section className='flex flex-1 flex-col md:flex md:flex-row items-center bg-gray-8 my-3'>
                <img className=' h-40 w-auto md:h-48 ' src={blog} alt='blog image'/>
                <div className='flex flex-col items-center'>
                    <h3 className=' text-lg font-semibold text-slate-200 font-serif mt-5 mb-5 md:text-xl md:ml-2'>Find the latest and top trending <br/>stories in and outside the tech space</h3>
                    {user ?
                    <> 
                    <p className='text-slate-200 text-sm mb-2'>Register / Login to start creating your stories</p>
                    <div className='md:flex md:flex-row md:mt-3 md:gap-3'>
                        <Link to='/sign-up'><button className=' bg-slate-300 text-gray-800 hover:ring-2 hover:ring-slate-300 hover:bg-slate-700 hover:text-slate-200 font-semibold rounded-md px-4 py-1 mr-5 md:text-lg md:ml-6 md:px-8'
                        >Register</button></Link>
                        <Link to='/login'><button className='bg-slate-300 text-gray-800 hover:ring-2 hover:ring-slate-300 font-semibold hover:bg-slate-700 hover:text-slate-200 rounded-md px-5 py-1 md:text-lg md:px-10 '
                        >Login</button></Link>
                    </div> 
                    </>
                    :
                    <div className='flex flex-col'>
                        <p className='text-slate-200'>Check out the latest trending blog stories  </p>
                        <NavLink to='/posts' className='text-center'><button className='bg-slate-300 text-gray-800 hover:ring-2 hover:ring-slate-300 hover:bg-slate-700 hover:text-slate-200 font-semibold rounded-md px-4 py-1 mr-5 md:text-lg md:ml-6 md:px-8'>Top Stories</button></NavLink>
                    </div>}
                </div>
            </section>
        </div>
    </div>
  )
} 

export default Home;
