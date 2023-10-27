import  {Connect}  from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

Connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
         if(!user){
            return NextResponse.json({
                error:"Invalid Token!"
            })
        }
        console.log(user)
       user.isVerified = true
       user.varifyToken = undefined
       user.varifyTokenExpiry = undefined
       await user.save()
       return NextResponse.json({
        success:true,
        message:"Email has been verified!"
       })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
    }
}