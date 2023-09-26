import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import blogPng from '../Assets/Images/nobg.png'

const NewHome = () => {
  return (
    <div>
      <section className="w-full bg-[url('https://www.nicepng.com/png/detail/260-2608673_blue-background-png-blue-abstract-png-transparent.png')] bg-no-repeat bg-cover h-screen flex flex-row justify-betwee justif-center b-blue-900 border-t p-3 px-6">
        <div className="flex flex-col gap-y-10 mt-2 lg:mt-10">
          <div className="flex flex-col gap-y-3 lg:gap-y-6 font-bold text-blue-900 text-4xl lg:text-6xl font-heading-1 tracking-wider mt-8">
            <h1 className="">Top</h1>
            <h1>Trending Stories</h1>
          </div>
          <p className="text-lg lg:text-xl text-blue-900 opacity-75 text-gay-100">
            Discover a diverse array of topics, articles and stories in our
            blog.
          </p>
          <Link
            to="/dashboard"
            className="w-fit bg-transparent text-blue-900 font-heading-1 tracking-widest text-lg lg:text-xl border-blue-900 border font-medium px-8 py-1 lg:mt-4 rounded-md hover:bg-blue-900 hover:text-white hover:border-none"
          >
            Top Stories
          </Link>
        </div>
        <div className='ml-8 hidden sm:block mt-4'>
        <img
          src={blogPng}
          alt="blog img"
          className="w-72 h-80"
        />
        </div>
      </section>
      <div className="flex flex-col items-center bg-gray-50 mx-7 p-4 border2 rounded-lg md:mt-16 md:gap-3">
        <h3 className="text-xl md:text-3xl font-medium text-blue-900 font-heading-1">
          Diversity
        </h3>
        <p className="text-center text-blue-900 opacity-80 mb-2 mt-1 md:text-xl md:px-5 tracking-wider">
          Discover a diverse array of topics in our blog. Dive into the
          fascinating world of science and technology, where we explore
          groundbreaking innovations and discuss their impact on society.
        </p>
        <Link
          to="/login"
          className="p-2 px-10  md:text-2xl md:hover:bg-transparent md:hover:ring-1 md:hover:text-blue-900 md:hover:ring-blue-900 bg-blue-900 text-white text-base rounded-md"
        >
          Get Started
        </Link>
      </div>
      <div className="text-center my-8 md:my-14">
        <FontAwesomeIcon
          icon={faUsers}
          className="text-[70px] text-blue-900 md:text-[10rem] "
        />
        <p className="text-lg text-blue-900 opacity-80 md:mt-4 md:text-3xl">
          All you need in one place
        </p>
      </div>
    </div>
  );
}

export default NewHome