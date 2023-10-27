import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

Connect()
export async function POST(request:NextResponse){
    try {
       const {email,password} = await request.json()
        //chcking if the user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error: "User not found"
            })
        }
        //check if the password is correct
        const validatePassword = await bcryptjs.compare(password,user.password)
        if(!validatePassword){
            return NextResponse.json({
                error: "Password is incorrect"
            })
        }
        //create Token data
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        //create Token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response = NextResponse.json({
            message: "User logged in",
        })
        response.cookies.set('token',token,{
            httpOnly:true, 
        })
        return response
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        })
    }
}