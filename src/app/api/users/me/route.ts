import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export  async function GET(request:NextRequest){
    try {
        const id = await getDataFromToken(request)
        console.log(id)
        return NextResponse.json({
            id
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        })
    }
}