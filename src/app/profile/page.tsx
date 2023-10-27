"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function page() {
  const [id,setId] = useState("")
    const getData = async()=>{
      const userId = await axios.get('/api/users/me')
      setId(userId.data.id)
    }
    getData()
    const route = useRouter()
    const  logout = async ()=>{
        const response = await axios.get('/api/users/logout')
        console.log(response.data)
        route.push('/')
    }
  return <>
    <div>This is the profile page!</div>
    <button onClick={logout} className='bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 text-white font-bold'>Log out</button>
    <button onClick={()=>route.push(`/profile/${id}`)} className='bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 text-white font-bold' >GO to Profile details</button>
  </>
}
