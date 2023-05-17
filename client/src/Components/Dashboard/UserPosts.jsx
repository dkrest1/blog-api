import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card, CardBody,CardFooter,Typography,Button,CardHeader, Avatar, Popover,PopoverHandler,PopoverContent,} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import blog1Img from '../../Assets/Images/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBookmark, faComment, faHeart, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
import userAvatar from '../../Assets/Images/emma.jpg'
import { useDispatch, useSelector } from "react-redux";
import { handleLikeButton } from "../redux/UserPostSlice";
import { allUserPosts } from "../redux/UserPostSlice";

export  const UserPosts = ()=>{

    const likeState = useSelector((state)=>state.userPost.likeState)
    const dispatch = useDispatch()
    // const myPost = useSelector((state)=>state.userPost.userPost)
    const myPost = useSelector(allUserPosts)
    // console.log(myPost)
    // const myPost = useSelector(selectAllPosts)
    // console.log(myPost)

    let objectsPerPage =2;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(myPost.length / objectsPerPage);
  
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  const startIndex = (currentPage - 1) * objectsPerPage;
  const endIndex = startIndex + objectsPerPage;
  const currentObjects = myPost.slice(startIndex, endIndex);

  const navigateTo = useNavigate()
  const onReadMoreClick = ()=>{
    console.log('I clicked')
    navigateTo('/write')
  }
//   const [likeState, setButtonState] = useState(false)
  const [bookmarkState, setBookmarkState] = useState(false)
//   const handleLikeButton =()=>{
//     // console.log("Clicked")
//     setButtonState(!likeState)
//   }
  const handleBookmarkButton = ()=>{
    setBookmarkState(!bookmarkState)
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
                                            <Typography variant="small" color="blue-gray" >
                                            {object.author}
                                            </Typography>
                                        </div>
                                    </div>
                                <img src={blog1Img} alt='card image' className=' w-auto h-auto'/>
                            </CardHeader>
                            <CardBody className='-mt-5'>
                                <Typography variant='h5' color='blue-gray'>
                                    {object.title}
                                </Typography>
                                <Typography variant='lead' color='gray' className='text-sm mt- font-normal'>
                                    {object.content.substring(0, 60)}...
                                </Typography>
                                <Link to='/write' className=''>
                                    <button  className="text-blue-600 text-xs" onClick={onReadMoreClick}>
                                        Read more 
                                        <FontAwesomeIcon icon={faArrowRightLong}/>
                                    </button>
                                </Link>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between -mt-12 -mb-3">
                                <Typography className="font-normal text-[10px]">
                                    {object.date}
                                </Typography>
                                <Typography variant='lead' className='bg-blue-gray-50 text-gray-500 text-xs px-2 py-1'>
                                    {object.category}
                                </Typography>
                                </CardFooter>
                                <CardFooter className='-mb-3'>
                                <div className='flex justify-between gap-2 text-xs -mt-6'>
                                    <button onClick={()=>dispatch(handleLikeButton())}>
                                        <FontAwesomeIcon icon={faHeart} className={`${likeState && 'text-red-600'}`}/> <span>{object.PostLikes}</span>
                                    </button>
                                    <button>
                                        <FontAwesomeIcon icon={faComment}/> <span>{object.PostComments}</span>
                                    </button>
                                    <button onClick={handleBookmarkButton}>
                                        <FontAwesomeIcon icon={faBookmark} className={`${bookmarkState && 'text-blue-900'}`}/>
                                    </button>
                                    <Popover placement="bottom-end">
                                        <PopoverHandler>
                                            <FontAwesomeIcon icon={faEllipsis}/>
                                        </PopoverHandler>
                                        <PopoverContent>
                                            <div className=' flex flex-col items-start space-y-3'>
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
                <div>
                    {Array.from({ length: totalPages }).map((_, index) => (
                    <button className='mr-2 text-xs' key={index} onClick={() => handlePageChange(index + 1)}>
                        Page{index + 1}
                    </button>
                    ))}
                </div>
            </div>
        </div>
      )
  }