import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'

const BackButton = ()=>{
  const navigate = useNavigate()
  const handleBackButton = ()=>{
    navigate(-1);
  }
  return(
    <nav className="bg-gray-800 py-1">
      <button onClick={handleBackButton}>
        <FontAwesomeIcon icon={faLessThan} className='text-slate-200 text-lg pl-3'/> 
      </button>
    </nav>
  )
  }
const SignUpForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  let status =''
  const notify=()=>toast(status)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    // console.log(value)
    if(errors[name]){
    setErrors((prevValues)=>({...prevValues, [name]:''}))
    // console.log(errors)
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:3000/auth/register", 
        {
          email: formValues.email.toString(),
          firstname: formValues.firstName.toString(),
          lastname: formValues.lastName.toString(),
          password: formValues.confirmPassword.toString(),

        })
        .then(function (response) {
          console.log(response);
          if (response.statusText==='OK'){
            alert("sign up successful")
            openModal()
          }
          console.log(response.status)
        })
        .catch(function(error){
          console.log(error)
          status =error.response.data.message
          notify()
        })
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (values) => {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required.";
    }

    if(!values.lastName){
        errors.lastName ='Last Name is required'
    }

    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (!values.confirmPassword){
        errors.confirmPassword = "Please enter password again."
    }else if(values.password !==values.confirmPassword){
        errors.confirmPassword ="Password did not match"
    }
    return errors;
  };

  const [showModal, setShowModal] = useState(false);
  
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };  
  function Modal() {
    return (
      <div>
        {/* <button onClick={openModal}>Login</button> */}
        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg md:p-14">
              <h2 className="text-2xl font-bold mb-4 text-center font-mono md:text-3xl">Login</h2>
              <form>
                <div className="mb-">
                  <label className="block text-gray-700 font-bold mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-">
                  <label className="block text-gray-700 font-bold mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign In
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
 
  return (
    <div className="h-full">
      {/* <BackButton/> */}
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <ToastContainer/>
          <div><Modal/></div>
        <div className="bg-white lg:w-1/3 md:w-1/2 sm:w-2/3 rounded-lg shadow-lg p-8 lg:my-4">
          <h2 className="text-center font-bold text-gray-800 text-xl mb-4">
            Create an account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="first-name" className="block text-gray-800 text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="last-name" className="block text-gray-800 text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-800 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.confirmPassword ? "border-red-500" :  formValues.confirmPassword && formValues.confirmPassword ===formValues.password ? 'border-blue-600' :''
                  }`}
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="text-center">        
                  <button
                      type="submit"
                      className="py-1 px-6 bg-blue-800 text-white rounded-lg hover:bg-transparent hover:text-blue-800 hover:ring-1 hover:ring-blue-800"   >
                      Sign Up
                  </button>
              </div>
              <div>
                  <p className='text-xs mt-3 md:text-lg'>Don't have an account? <Link className=' underline' to='/login'>Login in here</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export {BackButton}
export default SignUpForm; 


