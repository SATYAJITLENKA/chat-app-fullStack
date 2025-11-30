import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const isAuthenticated = async(req , res , next )=>{
    try {
        const token = req.cookies.jwt ; 
        if ( !token ){
            res.status(401).json({message : "Unauthorized - No token provided "})
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET  )
        if ( !decode ){
            res.status(401).json({message : "Unauthorized - No token provided "})
        }
        const user = await User.findById(decode.userId).select("-password")
        if( !user ){
            res.status(404).json({message : "User not found"})
        }
        req.user = user 
        next () ; 
    } catch (error) {
        console.log("user auth error" , error);
        res.status(500).json({message : "Internal error"})
    }
}