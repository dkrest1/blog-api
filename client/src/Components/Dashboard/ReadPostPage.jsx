import React from 'react'
import TopMenu from '../TopMenu'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../redux/PostsSlice'
import { Avatar, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import {Timeline,TimelineItem,TimelineConnector,TimelineHeader,TimelineIcon,TimelineBody,Typography,} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBookmark, faComment, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Posts from './Posts'
import { useNavigate, useParams } from 'react-router-dom'
import { userDetails } from '../redux/UserSlice'
import { post } from '../redux/PostSlice'
import { token } from '../redux/AccessTokenSlice'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
import { user } from '../redux/UserDataSlice'

const ReadPostPage = ({postArray}) => {
  const {id} = useParams() 
  const userdetails = useSelector(userDetails)
  const userData = useSelector(user)
  const postFetched = useSelector(post)
  const accessToken = useSelector(token)
  // const postArray = useSelector(selectAllPosts)
  let postId = (id)

  const notify=()=> toast('successful!')

  const [likeState, setLikeState] = useState(false)
  const [bookmarkState, setBookmarkState] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [commentList, setCommentList] = useState(null)
  const [error, setError] = useState('')
  const [comments, setComments] = useState({
    comment: ''
  })
  const [commentsCount, setCommentcount] = useState(null)
  const [editComment, setEditComment] = useState(null)


  const onInputChange =(event)=>{
    const {name, value} = event.target
    setComments({[name]: value})
    setError('')
  }
  const handleLikeButton = ()=>{
    setLikeState(!likeState)
  }
  const handleBookmarkButton = ()=>{
    setBookmarkState(!bookmarkState)
  }
  const handleCommentClick =()=>{
    setShowComment(!showComment)
  }

  const headers ={
    Authorization: `Bearer ${accessToken}`,
    'content-type': 'application/json',
  }
  const navigateTo = useNavigate()
  useEffect(()=>{
    if(!accessToken){
      navigateTo('/login')
    }
  })
  useEffect(()=>{
    axios.get(`http://localhost:3000/comment`, {headers})
    .then(function(response){
      // console.log(response)
      // console.log(response.data)
      let data = response.data
      const filteredComment = data.filter((value)=>value.post.id === postId  
    )
      setCommentList(filteredComment)
    })
    .catch(function(error){
      console.log(error)
    })
  },)
  // console.log(commentList)
  const handleSubmitComment =(event)=>{
    event.preventDefault()
    if(!comments.comment){
      setError('Comment cannot be empty!')
      return
    }
    else if(!editComment){
    axios.post(`http://localhost:3000/comment/create/${postId}`,comments, {headers})
    .then(function(response){
      // console.log(response.data)
      notify()
      setShowComment(!showComment)
    })
    .catch(function(error){
      console.log(error)
    })
  } else{
    axios.patch(`http://localhost:3000/comment/patch/${postId}`)
  }
  }

  const deleted=()=>toast("Comment deleted successfully")
    const handleDeleteComment=(commentId)=>{
      console.log(commentId)
      console.log(commentList)
      const headers={
        Authorization : `Bearers ${accessToken}`
      }
      axios.delete(`http://localhost:3000/comment/${commentId}`, {headers})
      .then(function(response){
        console.log(response)
        if(response.statusText==='OK'){
          console.log('deleted')
          setCommentList(commentList.filter((comment)=>comment.id !==commentId))
          deleted()
        }
      })
    }

    useEffect(()=>{
      if (editComment){
        setComments({comment:editComment.comment})
      } else{
        setComments({comment:''})
      }
    },[setComments, editComment])

    const handleEditComment=(commentId)=>{
      console.log(commentId)
      setShowComment(true)
      setEditComment(commentList.find((comment)=>comment.id===commentId))
    }
  // console.log(typeof(commentList))
 
  const DisplayPost =()=>{
    
    return(
      <div className=''>
        <ToastContainer/>
        {postFetched ?
        <>
        {
          postFetched.map((value)=>{
            if(value.id === postId){
              return(
                <div key={value.id} className='flex flex-col '>
                  <h2 className='font-semibold text-2xl md:text-4xl'>{value.title}</h2>
                  <p><Avatar src={value.userAvatar} size='xs'/>
                    <span className='text-xs ml-1'>{value.user.firstname} {value.user.lastname}</span></p>
                  <div className='flex flex-col items-center'>
                  <img src={value.image} className=' w-40'/>
                  </div>
                  <p className='px-2'>{value.content}</p>
                  <small className='text-xs text-gray-600'>{value.date}</small>
                  {/* <div> */}
                  <div className='flex justify-between mt-3 '>
                    <button onClick={handleLikeButton}>
                      <FontAwesomeIcon icon={faHeart} className={` text-gray-700 ${likeState && 'text-red-600'}`}/> <span>{value.postLikes}</span>
                    </button>
                    <button onClick={handleCommentClick}>
                      <FontAwesomeIcon icon={faComment} className=' text-gray-700'/> <span>{value.postComments}</span>
                    </button>
                    <button onClick={handleBookmarkButton}>
                      <FontAwesomeIcon icon={faBookmark} className={` text-gray-700 ${bookmarkState && 'text-blue-900'}`}/>
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
                  <div className={` mt-5 flex flex-col items-start ${!showComment && 'hidden'}`}>
                    <p>Write Comment</p>
                    <p className='text-xs text-red-600'>{error}</p>
                    <textarea className='w-full border-2 border-collapse rounded h-16'
                      name='comment'
                      value={comments.comment}
                      onChange={()=>onInputChange(event)}
                    />
                    <button onClick={handleSubmitComment} className='bg-blue-400 p-2 m-2 text-sm'>Post Comment</button>
                  </div>
                  <div className='mt-3'>
                    
                    { !commentList ?
                    <p>cannot fetch comments</p>
                    :
                    // ""
                    commentList.map((obj)=>(
                      <Timeline key={obj.id}>
                        <TimelineItem className=''>
                          <TimelineConnector/>
                          <TimelineHeader>
                            {/* <TimelineIcon/> */}
                            <TimelineIcon variant='filled' color='blue-gray' className=''>
                              {/* <Avatar src={value.userAvatar} size='xs'/> */}
                              {/* <Avatar src={userdetails.profilePic} size='xs'/> */}
                              {/* <p className='text-xs text-gray-800'>{obj.user.firstname} {obj.user.lastname}</p> */}
                            </TimelineIcon>
                            <div className='flex flex-row justify-between w-full'>
                              <Typography variant='h7' className='text-sm font-medium'>{obj.user.firstname} {obj.user.lastname}</Typography>
                              <Popover placement="bottom-end" className=''>
                                    <PopoverHandler>
                                        <FontAwesomeIcon icon={faEllipsis}/>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <div className=' flex flex-col z-20 items-start space-y-3'>
                                            { userData.email === obj.user.email ? 
                                              <>
                                                <button onClick={()=>handleEditComment(obj.id)}>Edit Comment</button>
                                                <button onClick={()=>handleDeleteComment(obj.id)}>Delete Comment</button>
                                              </>
                                              :
                                              <>
                                                <button>Report this comment</button>
                                              </>
                                              }
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                          </TimelineHeader>
                          <TimelineBody>
                            <Typography className='text-gray-600 text-sm '>
                              {obj.comment}
                            </Typography>
                          </TimelineBody>
                        </TimelineItem>
                      </Timeline>
                      ))
                    }
                  </div>
                </div>
              )
            } 
          })
        }
        </>
        :
        <p>Encountered a problem fetching post</p>
      }
      </div>
    )
  }

  return (
    <div className=''>
      <div className='p-3'>
        {DisplayPost()}
      </div>
      <div className='mt-2 p-2'>
        <p className='text-gray-600'>Check related posts</p>
        <Posts postFetched={postFetched} />
      </div>
    </div>
  )
}
// }

export default ReadPostPage
