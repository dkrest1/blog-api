import React from 'react'
import { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import {Card, CardBody, CardHeader, CardFooter,Typography,Button, IconButton, Avatar, Popover,PopoverHandler,PopoverContent,} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";  
import blog1Img from '../../Assets/Images/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
import userAvatar from '../../Assets/Images/emma.jpg'
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../redux/PostsSlice';
 

const Posts = () => {
    const postArray = useSelector(selectAllPosts)
    let objectsPerPage =2;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(postArray.length / objectsPerPage);
  
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handlePrevPage = ()=>{
    setCurrentPage(currentPage - 1)
  }
  const handleNextPage = ()=>{
    setCurrentPage(currentPage + 1)
  }
  
  const startIndex = (currentPage - 1) * objectsPerPage;
  const endIndex = startIndex + objectsPerPage;
  const currentObjects = postArray.slice(startIndex, endIndex);

  const navigateTo = useNavigate()

  const onReadMoreClick = (postId)=>{
    navigateTo(`/read-post-page/${postId}`)
    console.log(postId)
    }
  
  const [likeState, setButtonState] = useState(false)
  const [bookmarkState, setBookmarkState] = useState(false)
  const handleLikeButton =()=>{
    setButtonState(!likeState)
  }
  const handleBookmarkButton = ()=>{
    setBookmarkState(!bookmarkState)
  }
const Pagination =()=>{
  return (
    <div className="mx-0 flex items-center gap-">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center text-xs"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-2 w-2" /> Previous
      </Button>
      <div className="flex items-center gap1 mx-0">
     { Array.from({ length: totalPages }).map((_, index) =>(
        <IconButton key={index} variant={`${index+1 ===currentPage ? 'filled' : 'text'}`} color={`${index+1 ===currentPage ? 'blue' : 'blue-gray'}`} className='px-0 mx-0' onClick={()=>handlePageChange(index+1)}>{index+1} </IconButton>
     ))
     }
    </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center mx-0 "
        onClick={handleNextPage}
        disabled={currentPage === totalPages.length-1}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-2 w-2" />
      </Button>
    </div>
    );
  }


  return (
    <div className='flex flex-col items-center'>
        {/* <Cards/> */}
        <div className='flex flex-col items-center'>
            {currentObjects.map((object)=>(
                <div key={object.id} className='flex flex-col items-center mt-2 mb-3  p-2 text-slate-900 w-2/3 rounded-md'>
                    <Card className=" w-[14rem]">
                        <CardHeader
                            floated={false}
                            color='transparent'
                            className='rounded'>
                                <div className="flex w-full gap-2">
                                <Avatar
                                    size='sm'
                                    variant='circular'
                                    src={userAvatar} alt='user avatar'
                                />
                                    <div className="flex items-center justify-between">
                                        <Typography variant="small" color="blue-gray">
                                        {object.user}
                                        </Typography>
                                    </div>
                                </div>
                            <img src={blog1Img} alt='card image' className=' w-auto h-auto'/>
                        </CardHeader>
                        <CardBody className='-mt-5 -mb-2 z-10'>
                            <Typography variant='h5' color='blue-gray'>
                                {object.title}
                            </Typography>
                            <Typography variant='lead' color='gray' className='text-sm mt- font-normal'>
                                {object.content.substring(0, 60)}...
                                <button className='text-xs z-10 text-blue-500' onClick={()=>onReadMoreClick(object.id)}>Read more</button>
                            </Typography>
                        </CardBody>
                        <CardFooter className='flex -mt-10 -mb-6 z-0'>
                            <Typography className="font-normal text-[10px]">
                                {object.date}
                            </Typography>
                            <Typography variant='lead' className='bg-blue-gray-50 text-gray-500 text-xs px-2 py-1'>
                                {object.category}
                            </Typography>
                        </CardFooter>
                        <CardFooter className='-mb-3 z-10 '>
                            <div className='flex justify-between gap-2 text-xs -mt-6'>
                                <button onClick={handleLikeButton}>
                                    <FontAwesomeIcon icon={faHeart} className={`${likeState && 'text-red-600'}`}/> <span>{object.PostLikes}</span>
                                </button>
                                <button>
                                    <FontAwesomeIcon icon={faComment}/> <span>{object.PostComments}</span>
                                </button>
                                <button onClick={handleBookmarkButton}>
                                    <FontAwesomeIcon icon={faBookmark} className={`${bookmarkState && 'text-blue-900'}`}/>
                                </button>
                                <Popover placement="bottom-end" className=''>
                                    <PopoverHandler>
                                        <FontAwesomeIcon icon={faEllipsis}/>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <div className=' flex flex-col z-10 items-start space-y-3'>
                                            <button>Mute this author</button>
                                            <button>Mute this story</button>
                                            <button>Report</button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            
                        </CardFooter>
                    </Card>
                </div>
            ))}
            <Pagination/>
        </div>
    </div>
  )
}
export default Posts;
