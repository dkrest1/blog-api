import React from "react";
import { useState, useEffect, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
=======
>>>>>>> 2b38abf (update: add comments, likes and bookmark buttons to posts, managed posts with redux, worked on comment button and write posts)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BackButton } from "../Auth/SignUp";
import TopMenu from "../TopMenu";
<<<<<<< HEAD
// import
// import { PlusIcon } from "@heroicons/react/outline";

function WritingPage() {
  const navigateTo = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const focusEditor = () => editor.current.focus();
  useEffect(() => {
    focusEditor();
  }, []);

=======
import { useSelector, useDispatch } from "react-redux";
import { allUserPosts } from "../redux/UserPostSlice";
import { postAdded } from "../redux/UserPostSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserPosts } from "./UserPosts";

function WritingPage() {
  const userPost = useSelector(allUserPosts)
  const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const [postTitle, setPostTitle] =useState('')
    const [postContent, setPostContent] =useState('')

    const notify =()=> toast('Published successfuly')
  const onPublishPost =(event)=>{
    event.preventDefault()
    if(postTitle && postContent){
      dispatch(
        postAdded(postTitle, postContent)
      )
      setPostTitle('')
      setPostContent('')
      notify()
      localStorage.setItem('posts', JSON.stringify(userPost))
    }
  }
  useEffect(()=>{
    const savedPosts = localStorage.getItem('posts')
    // console.log(JSON.parse(savedPosts))
  })
>>>>>>> 2b38abf (update: add comments, likes and bookmark buttons to posts, managed posts with redux, worked on comment button and write posts)
  return (
    <div className="flex flex-col h-screen">
      {/* <div className=""><BackButton/></div> */}
      <TopMenu />
      <div className="flex-1 overflow-y-auto px-2">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Write a new post
            </h2>
            <ToastContainer/>
            <button
              onClick={onPublishPost} 
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {/* <PlusIcon className="w-5 h-5 mr-2" /> */}
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Publish
            </button>
          </div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={postTitle}
                  onChange={(e)=>setPostTitle(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body
                </label>
<<<<<<< HEAD
                <div className="mt-1" onClick={focusEditor}>
                  <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => setEditorState(editorState)}
=======
                <div>
                  <textarea className="w-full h-32"
                    value={postContent}
                    onChange={(e)=>setPostContent(e.target.value)}
>>>>>>> 2b38abf (update: add comments, likes and bookmark buttons to posts, managed posts with redux, worked on comment button and write posts)
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserPosts/>
      </div>
    </div>
  );
}

export default WritingPage;
