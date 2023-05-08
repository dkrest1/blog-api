import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./Components/Navbar";
import { Login } from './Components/Login';
import Home from './Components/Home';
import SignUpForm from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import { useState } from 'react';
import Profile from './Components/Profile';
import WritingPage from './Components/Write';


function App() {


  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        {/* <Navbar/> */}
        
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUpForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/write' element={<WritingPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
