import React, { useEffect } from 'react'
import { useState, } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import {Card, CardBody, CardHeader, CardFooter,Typography,Button, IconButton, Avatar, Popover,PopoverHandler,PopoverContent,} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";  
import blog1Img from '../../Assets/Images/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
// import userAvatar from '../../Assets/Images/emma.jpg'
import { useDispatch, useSelector } from 'react-redux';
// import { selectAllPosts } from '../redux/PostsSlice';
import {token} from '../redux/AccessTokenSlice'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import { user } from '../redux/UserDataSlice';
import { getPosts } from '../redux/PostSlice';
import UseGet from '../UseGet';
import ReactLoading from 'react-loading'
import emma from '../../Assets/Images/emma.jpg'
import blogimg from '../../Assets/Images/blog2.png'
import TimeAgo from '../TimeAgo';
 

const Pagination =({totalPages, currentPage, setCurrentPage})=>{

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handlePrevPage = ()=>{
    setCurrentPage(currentPage - 1)
  }
  const handleNextPage = ()=>{
    setCurrentPage(currentPage + 1)
  }
  
  return (
    <div className="mx-0 flex items-center gap-">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center text-xs md:text-base"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-2 w-2 md:h-6 md:w-7 " /> Previous
      </Button>
      <div className="flex items-center gap1 -mx-4">
    { Array.from({ length: totalPages }).map((_, index) =>(
        <IconButton key={index} size='sm' variant={`${index+1 ===currentPage ? 'filled' : 'text'}`} color={`${index+1 ===currentPage ? 'blue' : 'blue-gray'}`} className='px-0 mx-0 md:text-base' onClick={()=>handlePageChange(index+1)}>{index+1} </IconButton>
    ))
    }
    </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center -p-0 mx-6 md:text-base"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-2 w-2 md:w-7 md:h-6" />
      </Button>
    </div>
    );
}

const Posts = ({ postFetched, isPending}) => {
  const userData = useSelector(user)
  const accessToken = useSelector(token)
  const dispatch = useDispatch()
  let status
  const notify =()=>toast(status)
  const {fetchedPosts} = UseGet('http://localhost:3000/post', accessToken)

  let objectsPerPage
    if(postFetched && postFetched.length <4){
      objectsPerPage =2;
    }
    else if(postFetched && postFetched.length <10){
      objectsPerPage = 4
    }
    else if(postFetched && postFetched.length < 20){
      objectsPerPage = 5
    }
    else if(postFetched && postFetched.length < 30){
      objectsPerPage = 8
    }
    // console.log(postFetched.length)
  const [currentPage, setCurrentPage] = useState(1);  
  const totalPages =postFetched && Math.ceil(postFetched.length / objectsPerPage);
  const startIndex = (currentPage - 1) * objectsPerPage;
  const endIndex = startIndex + objectsPerPage;
  let currentObjects = postFetched && postFetched.slice(startIndex, endIndex) 

  const navigateTo = useNavigate()
  
  let [likeCount, setLikeCount] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
  const [bookmarkState, setBookmarkState] = useState(false)

  const handleLikeButton =(postId, userId)=>{
    const headers ={
      Authorization: `Bearer ${accessToken}`
    }
    axios.post(`http://localhost:3000/post/like/${postId}`, {headers} )
      .then(function(response){
        // if(response.statusText==='OK'){
        console.log(response)
        // console.log('liked by', userId)
      // }
      })
      .catch(function(error){
        console.log(error)
      })
  }
  const handleBookmarkButton = ()=>{
    setBookmarkState(!bookmarkState)
  }
  
  const handleDeletePost =(postId)=>{
    const headers ={
      Authorization: `Bearer ${accessToken}`
    }
    axios.delete(`http://localhost:3000/post/${postId}`, {headers} )
    .then(function(response){
      if(response.statusText==='OK'){
        status ="Post Deleted Successfully"
        notify()
        console.log(response)
        dispatch(getPosts( postFetched.filter((obj)=>obj.id!==postId)))
    }
    })
    .catch(function(error){
      status = "Something happened, couldn't delete post"
      notify()
      console.log(error)
    })
  }
  const handleEditPost = (postId) =>{
    if(fetchedPosts){
      let data = fetchedPosts.find((obj)=>obj.id===postId)
      localStorage.setItem('editPost', JSON.stringify(data))
      navigateTo(`/edit-post/${postId}`)
  } else{
    status="Couldn't fetch post"
    notify()
  }
  }

  return (
    <div className='flex flex-col md:w-full bg-white md:mt-5 md:'>
      <div className='absolute top-0 '> 
        <ToastContainer/>
      </div>
        {/* <Cards/> */}
        { isPending ?
          <ReactLoading type='spin' color='blue' height={50} width={50} className='self-center' />
        :postFetched ?
        <div className='flex flex-col divide-y divide-gray-200 md:w-full mx-2 md:gap-8 items-center '>
            {currentObjects.map((object)=>(
                <div key={object.id} className='flex flex-col pt-2 md:pt-4 w-full md:w-full'>
                    <div className='flex flex-col'>
                      <div className="flex justify-between w-full gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <Avatar
                              size='xs'
                              variant='circular'
                              // src={object.userAvatar} alt='user avatar'
                              src={emma} alt='user avatar'
                            />
                              <Typography variant="small" color="blue-gray" className='md:text-lg'>
                              {object.user.firstname} {object.user.lastname}
                              </Typography>
                          </div>
                          <div className='md:mr-5 items-center'>
                            <Typography variant='small' color='blue-gray' className='text-sm md:text-lg'>
                              <TimeAgo timestamp={object.created_at}/>
                            </Typography>
                          </div>
                      </div>
                      <CardBody className='-mt-5 -mb-2 z-0'>
                        <NavLink to={`/read-post-page/${object.id}`}>
                          <div className='flex flex-row justify-between items-center'>
                            <div className='md:-mt-'>
                              <Typography variant='h5' color='blue-gray' className=''>
                                  {object.title}
                              </Typography>
                              <div className='hidden md:flex md:flex-col md:-mt-'>
                                <p>{object.content.substr(0, 200)}...</p>
                              </div>
                            </div>
                            {/* <img src={object.image} alt='card image' className=' w-auto h-auto md:w-30 md:h-40'/> */}
                            <img src={blogimg} alt='card image' className=' w-14 h-14 md:w-40 md:h-40'/>
                          </div>
                          
                        </NavLink>
                      </CardBody>
                      {/* <CardFooter className='flex flex-row -mt-10 -mb-6 z-0 md:-mt-9 md:justify-between'>
                          <Typography variant='lead' className='bg-blue-gray-50 text-gray-500 text-xs px-2 py-1'>
                              {object.category}
                          </Typography>
                      </CardFooter> */}
                      <CardFooter className='-mb-5 sm:-mb-10 z-0 '>
                          <div className='flex justify-between gap-2 text-xs -mt-6 md:-mt-3'>
                              <button onClick={()=>handleLikeButton(object.id, object.user.id)}>
                                  <FontAwesomeIcon icon={faHeart} className={``}/> <span>{object.likeCount}</span>
                              </button>
                              <button>
                                  <FontAwesomeIcon icon={faComment}/> <span>{object.PostComments}</span>
                              </button>
                              <button onClick={handleBookmarkButton}>
                                  <FontAwesomeIcon icon={faBookmark} className={`${bookmarkState && 'text-blue-900'}`}/>
                              </button>
                              <Popover placement="bottom-end" className=''>
                                  <PopoverHandler>
                                      <FontAwesomeIcon icon={faEllipsis} className='md:text-2xl'/>
                                  </PopoverHandler>
                                  <PopoverContent clas>
                                      <div className='flex flex-col z-10 items-start space-y-3 md:w-36 md:text-lg md:items-center'>
                                          {userData && userData.email === object.user.email ? 
                                            <>
                                              <button onClick={()=>handleEditPost(object.id)}>Edit Story</button>
                                              <button onClick={()=>handleDeletePost(object.id)}>Delete Story</button>
                                            </>
                                            :
                                            <>
                                              <button>Mute this author</button>
                                              <button>Mute this story</button>
                                              <button>Report</button>
                                            </>
                                            }
                                      </div>
                                  </PopoverContent>
                              </Popover>
                          </div>
                      </CardFooter>
                    </div>
                    {/* </Card> */}
                </div>
            ))}
        </div>
        : 
        <p>Error fetching posts</p>
        }
        <div className='z-0 self-center md:mt-8 '>
          <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
            
    </div>
  )
}
export default Posts;
