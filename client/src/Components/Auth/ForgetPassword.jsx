import axios from 'axios'
import React, { useState } from 'react'
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from '@material-tailwind/react'
import { ResetPassword } from './ResetPassword'

export const ForgetPassword = () => {
    const [userEmail, setEmail] = useState(
        {
            email: ''
        }
    )
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const handleForgetPassword=(event)=>{
        event.preventDefault()
        if(userEmail.email===''){
            setError("Please enter your email to recover your password")
        }else{
            axios.post('http://localhost:3000/auth/forget/password')
            .then((response)=>{
                console.log(response)
                if(response.statusText==='OK'){
                    setOpen(true)
                }
            })
            .catch((error)=>{
                console.log(error)

            })
        }
    }
    // console.log(userEmail)
  return (
    <div className=' w-screen mt-2 px-2'>
        <h1 className='text-center text-lg font-bold'>Forgot Password Recovery</h1>
        <div className="w-full mb-3 flex gap-3">
            <Dialog open={open} handler={()=>setOpen(!open)} size='xl'>
                <DialogHeader >Password Reset</DialogHeader>
                <DialogBody divider>
                    A link to reset password has been sent to your mail.
                </DialogBody>
                <DialogFooter className='flex flex-row justify-center'>
                    <Button variant="gradient" color="blue" onClick={()=>setOpen(!open)} className=''>
                        OK
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
        <form>
            <div className='mt-2'>
                <label 
                    htmlFor='email' 
                    className='text-sm'>Enter Your Email Address</label>
                <input 
                    type='email'
                    name='name'
                    className='appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    required
                    value={userEmail.email}
                    onChange={()=>{
                        setEmail({email: event.target.value}) 
                        setError('')}}
                    />
                <p className='text-xs text-red-600'>{error}</p>
            </div>
            <button className='bg-blue-600 px-4 text-white mt-2'
                onClick={()=>handleForgetPassword(event)}>Get Reset Link</button>
        </form>
        <ResetPassword/>
    </div>
  )
}
