import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { Login } from './Components/Auth/Login';
import Home from './Components/Home';
import SignUpForm from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Footer';
import Profiles from './Components/Dashboard/Profiles';
import WritingPage from './Components/Dashboard/Write';
import Navbar from './Components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import ReadPostPage from './Components/Dashboard/ReadPostPage';
import { useEffect } from 'react';
import axios from 'axios';
import { token } from './Components/redux/AccessTokenSlice';
import { user, getUser } from './Components/redux/UserDataSlice';
import { EditPost } from './Components/Dashboard/EditPost';
import { ForgetPassword } from './Components/Auth/ForgetPassword';
import { ResetPassword } from './Components/Auth/ResetPassword';
import ReactLoading from 'react-loading'
import { pending, getPending } from './Components/redux/PendingSlice';
import Cookies from 'js-cookie';
import NotFound from './Components/NotFound';
import NewHome from './Components/NewHome';

function App() {
  const accessToken = useSelector(token)
  const userData=useSelector(user)
  const dispatch = useDispatch()
  const initialState = localStorage.getItem("profilePic") || null;
  const [selectedFile, setSelectedFile] = useState(initialState);
  const isPending= useSelector(pending)
  useEffect(()=>{
    if(!userData){
      const headers={
        Authorization: `Bearer ${accessToken}`
      }
      dispatch(getPending(true))
      axios.get('http://localhost:3000/user/me', {headers})
      .then((response)=>{
        dispatch(getUser(response.data))
        dispatch(getPending(false))
      })
      .catch((error)=>{
        console.log(error)
        dispatch(getPending(false))
      })
    }
  },[userData])
  useEffect(()=>{
    if(!userData && accessToken){
      Cookies.remove('token')
    }
  })

  return (
    <div className="App flex flex-col h-screen box-border">
      <BrowserRouter>
        <Navbar />
        {isPending ? (
          <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
            <ReactLoading
              type="spin"
              color="blue"
              height={50}
              width={50}
              className=""
            />
          </div>
        ) : (
          <Routes>
            <Route exact path="/" element={<NewHome />} />
            {/* <Route exact path="/old" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route
              path="/dashboard"
              element={<Dashboard accessToken={accessToken} />}
            />
            <Route
              path="/profile"
              element={
                <Profiles
                  setSelectedFile={setSelectedFile}
                  selectedFile={selectedFile}
                  accessToken={accessToken}
                />
              }
            />
            <Route
              path="/write"
              element={<WritingPage accessToken={accessToken} />}
            />
            <Route path="/read-post-page/:id" element={<ReadPostPage />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        )}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
