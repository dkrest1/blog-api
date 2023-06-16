
import axios from 'axios'
import React, { useEffect, useState} from 'react'

const UseGet = (url, token) => {
    const [fetchedData, setFetchedData] = useState(null)
    const [isPending, setIsPending] = useState(true)
 useEffect(()=>{
    const headers = {
      Authorization: `Bearer ${token}`
    }
    axios.get(url, {headers})
    .then((response)=>{
      // console.log(response.data)
      if(response.statusText==='OK'){
        let data = response.data
        setFetchedData(data.sort((a, b)=>b.created_at.localeCompare(a.created_at)))
      }
    })
    .catch((error)=>{
      console.log(error)
      setIsPending(false)
    })
 },[url])

 return {fetchedData, isPending, setIsPending}

}

export default UseGet;
