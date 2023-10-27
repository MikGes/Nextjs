import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


Connect()
export async function POST(request: NextRequest) {
    try{
        const { username, email, password } = await request.json();
    const user = await User.findOne({ email })
    //checking if the user exists
    if(user){
        return NextResponse.json({
            error: "User already exists"
        })
    }
    //hashing the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })
    //send an email vaeification 
    await sendEmail({email,emailType:'VERIFY',userId:newUser._id})
    return NextResponse.json({
        message: "User created",
        user: newUser
    })
    }catch(error:any){
        return NextResponse.json({
            error: error.message
        })
    }
}