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
import { useParams } from 'react-router-dom'
import { userDetails } from '../redux/UserSlice'

const ReadPostPage = ({postArray}) => {
  const {id} = useParams() 
  const userdetails = useSelector(userDetails)
  // const postArray = useSelector(selectAllPosts)
  let postId = Number(id)

  const [likeState, setLikeState] = useState(false)
  const [bookmarkState, setBookmarkState] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const [commentList, setCommentList] = useState([])
  const handleLikeButton = ()=>{
    setLikeState(!likeState)
  }
  const handleBookmarkButton = ()=>{
    setBookmarkState(!bookmarkState)
  }
  const handleCommentClick =()=>{
    setShowComment(!showComment)
  }
  const handSubmitComment =()=>{
    setCommentList([...commentList, commentContent])
    setCommentContent('')
    setShowComment(!showComment)
    console.log(commentList)
  }
 
  const DisplayPost =()=>{
    return(
      <div className=''>
        {
          postArray.map((value)=>{
            if(value.id === postId){
              return(
                <div key={value.id} className='flex flex-col '>
                  <h2 className='font-semibold text-2xl'>{value.title}</h2>
                  <p><Avatar src={value.userAvatar} size='xs'/>
                    <span className='text-xs ml-1'>{value.author}</span></p>
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
                    <textarea className='w-full border-2 border-collapse rounded h-16'
                      value={commentContent}
                      onChange={(event)=>{ 
                        setCommentContent(event.target.value)}}
                    />
                    <button onClick={handSubmitComment} className='bg-blue-400 p-2 m-2 text-sm'>Post Comment</button>
                  </div>
                  <div className='mt-3'>
                    {
                    commentList.map((comments)=>(
                      <Timeline key={comments}>
                        <TimelineItem className='bg-gray-50'>
                          <TimelineConnector/>
                          <TimelineHeader>
                            <TimelineIcon className='p-0'>
                              {/* <Avatar src={value.userAvatar} size='xs'/> */}
                              <Avatar src={userdetails.profilePic} size='xs'/>
                            </TimelineIcon>
                          </TimelineHeader>
                          <TimelineBody>
                            <Typography className='text-gray-600 text-sm '>
                              {comments}
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
        <Posts postArray={postArray}/>
      </div>
    </div>
  )
}
// }

export default ReadPostPage
