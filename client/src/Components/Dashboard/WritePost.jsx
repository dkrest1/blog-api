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

    // useEffect(()=>{
    //     const fetchUser = async()=>{
    //         const header ={ headers:{Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZTMzZDRjYy05NThhLTRhNTEtOGJmYy0xYjY4YzQ1NTJiZTgiLCJyb2xlIjoic3Vic2NyaWJlciIsImlhdCI6MTY4NTM1MjczMiwiZXhwIjoxNjg1MzU2MzMyfQ.kJHNVLUIyc3aeuszfXC5Q3Whv_V3wNQR1tER73fyUvs'}
    //         }
    //     const response = await axios.get('http://localhost:3000/user', header)
    //     console.log(response)
    //     }
    //     fetchUser()

    // },[])

    // useEffect(()=>{
    //     const fetchUser = async()=>{
    //         const header ={ headers:{Authorization: 'Bearer skdsfss22we2e3'}
    //         }
    //     const response = await axios.post('http://localhost:3000/user/me', header)
    //     console.log(response)
    //     }
    //     fetchUser()

    // },[])

    // axios.get('http://localhost:3000/user')

    
    const signUp =(event)=>{
        event.preventDefault()
        // setUser([{emails:email, firstName:fname, lastName:lname, pass:password}])
        axios.post('http://localhost:3000/user/create', 
        {
            email: "emmanuel@gmail.com",
            firstname:"Emmanel",
            lastname: "Amo",
            password:'1234566'
        })
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

const WritePost = ({accessToken}) => {
    // const [post, setPost] = useState([{
    //     id: "",
    //     title: "",
    //     content: "",
    //     published: false,
    // }])
    const [titleEl, setTite]=useState("")
    const [contEl, setCont]=useState("")
    const [formValues, setFormValues] = useState(
        {
            id: '1',
            title: '',
            content: '',
            published: true
        }
    )
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      };
    // const handleTitleChange=(event)=>{
    //     setTite(event.target.value)
    // }
    // const handleContChange=(event)=>{
    //     setCont(event.target.value)
    // }
    // console.log(post)
    const handlePostSubmit =(event)=>{
        event.preventDefault()
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          };
        // setPost([{id:'1', title:titleEl, content:contEl, published:true}] )
        axios.post("http://localhost:3000/post/create", 
            // {
            //     id:"1", title:"NEW TITLE", content:"This is the content", published:true
            // }
        formValues, {headers} )
        .then(response=>console.log(response))
        .catch(err=>console.log(err))
        // console.log(formValues)
    }
    // console.log(post)
  return (
    <div className='bg-gray-400'>
        <form>
            <div>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' onChange={handleInputChange}/>
            </div>
            <div>
                <label htmlFor='content'>Body</label>
                <textarea
                    name='content'
                    onChange={handleInputChange}
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
