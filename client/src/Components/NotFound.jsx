import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../Assets/Images/notfound.png'

const NotFound = () => {
  return (
    <div className="m-auto">
      <img src={notFound} alt="not found" className="w-72 h-72" />
      <div className='flex flex-row w-full justify-center space-x-1 font-heading-1 lg:text-lg'>
        <p>Return to</p>
        <Link to="/" className=" text-center text-blue-900">
         Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound