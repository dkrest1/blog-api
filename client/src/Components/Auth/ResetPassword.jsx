import React from 'react'
import { useState } from 'react';

export const ResetPassword = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "", 
        confirmPassword: ""
      });
      const [error, setError] = useState('')
      const handleInputChange =(event)=>{
        const {name, value} = event.target
        setFormValues((prevValues)=>({...prevValues, [name]:value}))
        setError((prevValues)=>({...prevValues, [name]:''}))
      }

      const handleResetPassword =(event)=>{
        event.preventDefault()
        console.log('clicked')
        if(formValues.email===''){
            setError('Please enter your email')
        } else if(formValues.password===''){
            setError('please enter new password')
        } else if(formValues.confirmPassword===''){
            setError('Please enter new password again')
        }
        else if(formValues.password !==formValues.confirmPassword){
            setError("Password do not match!")
        }
        else{
            console.log('good to go!!')
        }
      }
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-center font-mono md:text-3xl">Login</h2>
              <form>
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
                  <p className='text-xs text-red-600 mt-1'>{error}</p>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    New Password
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                  <p className='text-xs text-red-600 mt-1'>{error}</p>
                </div>
                <div>
                <label htmlFor="confirm-password" className="block text-gray-800 text-sm font-semibold mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder='confirm Password'
                  className={`block w-full h-8 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-gray-400 ${formValues.password!==formValues.confirmPassword 
                     ? "border-red-500" :  formValues.confirmPassword && formValues.confirmPassword ===formValues.password ? 'border-blue-600' :''
                  }`}
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
                  <p className="text-red-600 text-xs mt-1">{error}</p>
              </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleResetPassword}
                    // disabled={isPending}
                    // onClick={handleLoginSubmit}
                  >
                    Update Password 
                  </button>
                </div>
            </form>
    </div>
  )
}
