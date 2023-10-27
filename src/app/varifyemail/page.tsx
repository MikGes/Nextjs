    "use client"
    import axios from "axios"
    import Link from "next/link"
    import React,{useEffect,useState} from 'react'
    export default function VerifyEmail(){
    const [token, setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)
    const verifyUserEmail = async()=>{
        try {
            const response = await axios.post("/api/users/verifyemail",{token})
            if(response.data.error){
                setError(response.data.error)
            }
            else{
                setVerified(true)
            }
        } catch (error:any) {
            setError(error.message)
        }
    }
    useEffect(()=>{
    const token = window.location.search.split("=")[1]
    setToken(token || "")
    },[])
    useEffect(()=>{
    if(token.length > 0) verifyUserEmail()
    },[token])
    return <>
    <div className="h-screen bg-violet-600 grid place-content-center">
    <h1 className="text-white text-3xl">Verify your Email</h1>
    {token ==""&&<h1 className="text-white text-xl">No Token available</h1>}
    {verified && <div>
        <h1 className="text-white text-xl font-mono">Email Verified</h1>
        <Link href='/login'>Login!</Link>
        </div>}
    </div>
    </>
    }