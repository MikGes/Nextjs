"use client";
import Link from 'next/link'
import React from "react"
import {useRouter} from "next/navigation"
import axios from 'axios'
import toast from 'react-hot-toast';
export default function SignupPage(){
    const router = useRouter()
    const [loading,setLoading]=React.useState(false)
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    React.useEffect(()=>{
        if(user.email && user.password && user.username){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    const onSignUp = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup',user)
            console.log(response.data.error)
            if(response.data.error){
                toast.error(response.data.error)
            }
            else{
                router.push('/login')
            }
        } catch (error:any) {
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }
    return <div className='grid place-content-center mt-32'>
    <p className='text-4xl grid place-content-center'>{loading?"Loading...":"Sign Up"}</p>
    <input className='p-2 border-2 border-red-300 rounded-sm' placeholder='Username' onChange={(event)=>{setUser({...user,username:event.target.value})}} type='text'/><br></br>
    <input className='p-2 border-2 border-red-300 rounded-sm' placeholder='Email' onChange={(event)=>{setUser({...user,email:event.target.value})}} type='email'/><br></br>
    <input className='p-2 border-2 border-red-300 rounded-sm' placeholder='Password' onChange={(event)=>{setUser({...user,password:event.target.value})}} type='password'/><br></br>
    <button onClick={onSignUp} className='p-2 bg-blue-400 rounded-md'>{buttonDisabled?"Fill out the Form":"Sign Up"}</button>
    Already have an account? <Link  href='/login'>Login</Link>
    </div>
}