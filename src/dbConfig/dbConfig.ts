import mongoose from 'mongoose'
export async function Connect(){
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL!)
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    }catch(err){
        console.log(err)
    }
}