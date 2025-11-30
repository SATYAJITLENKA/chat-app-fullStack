import mongoose from "mongoose"

export const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONOGO_URI)
        console.log("mongodb connected " , conn.connection.host);
        
    } catch (error) {
        console.log( "Mongodb connection error" , error);
        
    }
}