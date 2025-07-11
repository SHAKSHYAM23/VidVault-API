import  ApiError  from "../utilis/ApiError.js";
import asyncHandler  from "../utilis/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request in authmiddlewre")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})


// import ApiError from "../utilis/ApiError";
// import asyncHandler from "../utilis/asyncHandler";
// import jwt from "jsonwebtoken"
// import { User } from "../models/user.models.js";
// export const  verifyJWT = asyncHandler(async (req,_,next)=>{
//   try {
//     const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
//     if(!token){
//       throw new ApiError(401,"Unatorised request")
//     }
//     const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//    const user = await User.findById(decodedtoken?.
//       _id).select("-password -refreshToken")
//       if(!user){
//           throw new ApiError(401,"invalid access token")
//       }
//       req.user = user;
//       next()
//   } catch (error) {
//     throw new ApiError(401,error.semmsa)
//   }
// })
