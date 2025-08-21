
import User from "../models/User.js";


//Middle to check if user is authenticated
export const protect = async(req,res,next)=>{
    const{userId} = req.auth;
    if(!userId){
        res.json({success : false, message:"not authenticated"})
    }else{
        const user=await user.findById(userId);
        req.user = user;
        next()
    }
}