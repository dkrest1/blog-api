import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Signup =()=>{
    const [email, setEmail]=useState('')
    const [fname, setFname]=useState('')
    const[lname, setLname]=useState('')
    const[password, setPassword]=useState('')
    const [user, setUser] =useState([
        {
            emails:email,
            firstName:fname,
            lastName:lname,
            pass:password
        }
    ])

    useEffect(()=>{
        const fetchUser = async()=>{
            const header ={ headers:{Authorization: 'Bearer skdsfss22we2e3'}
            }
        const response = await axios.get('http://localhost:3000/user/me', header)
        console.log(response)
        }
        fetchUser()

    },[])

    useEffect(()=>{
        const fetchUser = async()=>{
            const header ={ headers:{Authorization: 'Bearer skdsfss22we2e3'}
            }
        const response = await axios.post('http://localhost:3000/user/me', header)
        console.log(response)
        }
        fetchUser()

    },[])


    
    const signUp =(event)=>{
        event.preventDefault()
        // setUser([{emails:email, firstName:fname, lastName:lname, pass:password}])
        axios.post('http://localhost:3000/user/create', )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // )
        
    }
    // console.log(user)
    const onEmail =(e)=>setEmail(e.target.value)
    const onFirstname =(e)=>setFname(e.target.value)
    const onlastname =(e)=>setLname(e.target.value)
    const onPaswword =(e)=>setPassword(e.target.value)
    return(
        <div>
            <form>
                email: <input type='email' onChange={onEmail}/><br></br>
                firstname: <input type='text' onChange={onFirstname}/><br/>
                lastname: <input type='text' onChange={onlastname}/><br/>
                password: <input type='text' onChange={onPaswword}/><br/>
                <button onClick={signUp}>Sign Up</button>
            </form>
        </div>
    )
}

const WritePost = () => {
    const [post, setPost] = useState([{
        id: "",
        title: "",
        content: "",
        published: false,
    }])
    const [titleEl, setTite]=useState("")
    const [contEl, setCont]=useState("")
    const handleOnChange=(event)=>{
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleTitleChange=(event)=>{
        setTite(event.target.value)
    }
    const handleContChange=(event)=>{
        setCont(event.target.value)
    }
    // console.log(post)
    const handlePostSubmit =(event)=>{
        event.preventDefault()
        setPost([{id:'1', title:titleEl, content:contEl, published:true}] )
        axios.post("http://localhost:3000/post/create", {post})
        .then(response=>console.log(response))
        .catch(err=>console.log(err))
        // console.log(post)
    }
    // console.log(post)
  return (
    <div className='bg-gray-400'>
        <form>
            <div>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' onChange={handleTitleChange}/>
            </div>
            <div>
                <label htmlFor='content'>Body</label>
                <textarea
                    name='content'
                    onChange={handleContChange}
                />
            </div>
            <button onClick={handlePostSubmit}>Publish</button>
        </form>
        <br/><br/>
        <div>
            <Signup/>
        </div>
    </div>
  )
}

export default WritePost
