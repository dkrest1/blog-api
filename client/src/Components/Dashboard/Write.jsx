import React from "react";
import { useState, useEffect, useRef } from "react";
import {Editor, EditorState} from 'draft-js';
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {BackButton} from '../Auth/SignUp'
import TopMenu from "../TopMenu";
// import 
// import { PlusIcon } from "@heroicons/react/outline";

function WritingPage() {
    const navigateTo = useNavigate();
        const [editorState, setEditorState] = useState(
          EditorState.createEmpty()
        );
        const editor = useRef(null)
        const focusEditor = ()=> editor.current.focus()
        useEffect(()=>{
            focusEditor()
        },[])
  
  return (
    <div className="flex flex-col h-screen">
        {/* <div className=""><BackButton/></div> */}
        <TopMenu/>
      <div className="flex-1 overflow-y-auto px-2">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Write a new post
            </h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {/* <PlusIcon className="w-5 h-5 mr-2" /> */}
              <FontAwesomeIcon icon={faPlus} className='px-1'/> 
              Publish
            </button>
          </div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                  Body
                </label>
                <div className="mt-1" onClick={focusEditor}>
                  <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState=>setEditorState(editorState)}
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritingPage;
