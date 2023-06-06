
import axios from 'axios'
import React, { useEffect, useState} from 'react'

const UseGet = (url, token) => {
    const [fetchedPosts, setFetchedPosts] = useState(null)
    const [isPending, setIsPending] = useState(true)
 useEffect(()=>{
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios.get(url, {headers})
    .then((response)=>{
      if(response.statusText==='OK'){
        console.log(response.data)
        let data = response.data
        setFetchedPosts(data)
      }
    })
    .catch((error)=>{
      console.log(error)
      setIsPending(false)
    })
 },[url])

 return {fetchedPosts, isPending, setIsPending}

}

export default UseGet;
