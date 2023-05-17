import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './Components/Auth/Login';
import Home from './Components/Home';
import SignUpForm from './Components/Auth/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Footer';
import Profiles from './Components/Dashboard/Profiles';
import WritingPage from './Components/Dashboard/Write';
import PostPage from './Components/Dashboard/ReadPostPage';



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
          <Route path='/profile' element={<Profiles/>}/>
          <Route path='/write' element={<WritingPage/>}/>
          {/* <Route path='/write' element={<WriteStory/>}/> */}
          <Route path='/read-post-page' element={<PostPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
