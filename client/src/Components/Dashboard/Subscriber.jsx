import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Subscriber = () => {
  return (
    <div>
      <div className=" flex flex-col h-screen ">
        <div className="bg-white border-solid border-2 shadow-md h-30 mt-10 space-y-3 rounded-lg p-5 ">
          <p className="text-center m-y-3"> You need to be an Author to publish posts</p>
          <NavLink to='#'>
            <Button variant="filled" size="lg">Request to become an Author</Button>
          </NavLink>
          </div>
        </div>
    </div>
  )
}

export default Subscriber
