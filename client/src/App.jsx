import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { Login } from './Components/Auth/Login';
import Home from './Components/Home';
import SignUpForm from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Footer';
import Profiles from './Components/Dashboard/Profiles';
import WritingPage from './Components/Dashboard/Write';
import PostPage from './Components/Dashboard/ReadPostPage';
import Navbar from './Components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts } from './Components/redux/PostsSlice';
import ReadPostPage from './Components/Dashboard/ReadPostPage';
import { useEffect } from 'react';
import axios from 'axios';
import { token } from './Components/redux/AccessTokenSlice';
import { user } from './Components/redux/UserDataSlice';
import { getUser } from './Components/redux/UserDataSlice';



function App() {
  // const [userData, setUserData] = useState(null)
  const postArray = useSelector(selectAllPosts)
  const accessToken = useSelector(token)
  // const userdata = useSelector(user)
  // console.log(userdata)
  const dispatch = useDispatch()

  const initialState = localStorage.getItem("profilePic") || null;
  const [selectedFile, setSelectedFile] = useState(initialState);


  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar selectedFile={selectedFile}  />
        
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
          <Route path='/dashboard' element={<Dashboard postArray={postArray} accessToken={accessToken}/>}/>
          <Route path='/profile' element={<Profiles setSelectedFile={setSelectedFile} selectedFile={selectedFile} accessToken={accessToken}/>}/>
          <Route path='/write' element={<WritingPage accessToken={accessToken} />}/>
          {/* <Route path='/write' element={<WritePost accessToken={accessToken} />}/> */}
          {/* <Route path='/read-post-page/:id' element={<PostPage postArray={postArray} />}/> */}
          <Route path='/read-post-page/:id' element={<ReadPostPage postArray={postArray} />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
