import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import { selectAllPosts } from '../redux/PostsSlice'
import Posts from './Posts'

const SearchBox = ({filtered}) => {
    // const arrayPost = useSelector(selectAllPosts)
   
    
  return (
    <div>
        {/* <form onSubmit={handleSearchSubmit}>
            <input
            className=' w-[120px] md:w-[400px] h-5 md:h-8 text-xs md:text-lg p-1 md:p-2 border-collapse border-b-2'
            type='search'
            placeholder='search here...'
            value={searchItem}
            onChange={handleInputChange}
            />
        </form> */}
      {/* { filtered.length > 0 && */}
      <Posts postFetched={filtered}/>
      {/* } */}
    </div>
  )
}

export default SearchBox
