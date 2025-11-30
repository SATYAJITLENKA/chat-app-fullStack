import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs" ;


export const signup = async(req, res) => {
    const { fullname, email, password } = req.body;
    try {

        if ( !fullname || !email || !password ){
           return res.status(400).json({ message : "all field are required"})
        }

        const user = await User.findOne({email});

        if ( user ) return res.status(400).json({message : "user already exists"})

        const hashedPassword = await bcrypt.hash(password , 10 )

    
       const newUser = new User({
         fullname , 
         email , 
         password : hashedPassword 
       })

       if( newUser ){
         generateToken(newUser._id , res )
         await newUser.save()
         res.status(201).json({ 
            id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            
          })
       }else{
         return res.status(400).json({message:"Invalid user data"})
       }

    } catch (error) {
        console.log("Error in signup " , error);
        
       return res.status(500).json({message:"Internal serve error "})
    }
}

export const login = async(req, res) => {
    const {  email, password } = req.body;
    try {

        if ( !email || !password ){
           return res.status(400).json({ message : "all field are required"})
        }

        if ( password.length < 6 ){
           return res.status(400).json({ message : "password must be at least 6 character"})
        }

        const user = await User.findOne({email});

        if ( !user ) return res.status(400).json({message : "Enter valid email or password"})

        const isValidPassword = await bcrypt.compare(password , user.password  )

        if ( !isValidPassword) res.status(400).json({ message : "Enter valid email or password"})

        generateToken(user._id , res)

        return res.status(201).json({ 
            message : "login successfully" ,
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            
        })

    } catch (error) {
        console.log("Error in signup " , error);
        
       return res.status(500).json({message:"Internal serve error "})
    }
}

export const logout = (req, res) => {
   try {
      res.cookie("jwt" , "" , {maxAge:0});
      return res.status(200).json({message : "Logout successfully"})
   } catch (error) {
      console.log("Error logout controller" , error);
      return res.status(500).json({message : "Internal server error"})
   }
}


export const updateProfile = async(req , res)=>{
try {
   const {profilePic} = req.body ;
   console.log(profilePic);

   const userId = req.user._id;
   console.log(userId);
   
   if(!profilePic){
      return res.status(400).json({message:"profile pic is required"})
   }

   const uploadResponse = await cloudinary.uploader.upload(profilePic)

   const updatedUser = await User.findByIdAndUpdate(userId , {profilePic:uploadResponse.secure_url} , { new : true } )

   res.status(200).json(updatedUser)

} catch (error) {
   console.log("updated controller error" . error);
   return res.status(404).json({message:"Internal server error"})
}
}


export const checkAuth = ( req , res)=>{
   try {
      res.status(200).json(req.user)
   } catch (error) {
      console.log("Error in checkAuth controller" , error.message);
      return res.status(500).json({meaage : ":Internal server error"})
   }
}