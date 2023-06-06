import axios from 'axios';
import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { token } from '../redux/AccessTokenSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../redux/AccessTokenSlice';
import { user } from '../redux/UserDataSlice';
import { getUser } from '../redux/UserDataSlice';
import Cookies from 'js-cookie'
import { useEffect } from 'react';

export const Login = () => {
  const userdata = useSelector(user)
  const accessToken = useSelector(token)
  const [atoken, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getToken(Cookies.get('token')))
  }, [atoken])
  useEffect(()=>{
    dispatch(getUser(userData))
  })
  // console.log(atoken)
  // console.log(accessToken)
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  
  const navigateTo = useNavigate()
  const notify =()=> toast("Login Successful!")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleLoginSubmit =(event)=>{
    event.preventDefault()
    axios.post("http://localhost:3000/auth/login", formValues)
    .then(function (response){
      console.log(response)
      if (response.status === 201){
        notify()
        let data = response.data.access_token
        setToken(data)
        // localStorage.setItem('token', data)
        Cookies.set('token', data, {expires: 7})
        // userdata()
        const headers = {
          Authorization: `Bearer ${data}`
        }
        axios.get('http://localhost:3000/user/me', {headers})
        .then(function(response){
          let data = response.data
          setUserData(data)
          console.log(response.data)
        })
        .catch(function(error){
          console.log(error)
        })
        setTimeout(() => {
          navigateTo('/')
        }, 2000);
      }
    })
    .catch(function (error){
      console.log(error)
    })
  }
  // console.log(accessToken)

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg md:p-14">
              <ToastContainer/>
              <h2 className="text-2xl font-bold mb-4 text-center font-mono md:text-3xl">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type='submit'
                    // onClick={handleLoginSubmit}
                  >
                    Sign In
                  </button>
                  <Link to='/'>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"   
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
                <div>
                    <p className=' text-xs mt-3 md:text-base md:mt-4'>Don't have an account? <Link className=' underline' to='/sign-up'>Sign Up here</Link></p>
                  </div>
              </form>
            </div>
          </div>
        
    </div>
  )
}
