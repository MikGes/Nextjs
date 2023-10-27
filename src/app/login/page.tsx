"use client";
import Link from 'next/link'
import React from "react"
import {useRouter} from "next/navigation"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function LoginPage(){
    const router = useRouter()
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    React.useEffect(()=>{
        if(user.email && user.password){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    const onSignIn = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login',user)
            if(response.data.error){
                toast.error(response.data.error)
            }
            else{
                 router.push('/profile')
                toast.success('Logged in')
            }
            setLoading(false)
        } catch (error) {
            
        }
        finally{
            setLoading(false)
        }
    }
    return <div  className='grid place-content-center mt-32'>
    <ToastContainer/>
    <p className='text-4xl grid place-content-center'>{loading?"Loading...":"Login"}</p>
    <input className='p-2 border-2 border-red-300 rounded-sm' placeholder='Email' onChange={(event)=>{setUser({...user,email:event.target.value})}} type='email'/><br></br>
    <input className='p-2 border-2 border-red-300 rounded-sm' placeholder='Password' onChange={(event)=>{setUser({...user,password:event.target.value})}} type='password'/><br></br>
    <button onClick={onSignIn} className='p-2 bg-blue-400 rounded-md'>{buttonDisabled?"Fill the Form":"Login"}</button>
    Don't have an account? <Link  href='/signup'>Sign up</Link>
    </div>
}