import asyncHandler from "../utilis/asyncHandler.js";
import ApiError from "../utilis/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utilis/cloudinary.js";
import { ApiResponse } from "../utilis/Apiresponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId) => {
    try {
      const user =  await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      user.refreshToken = refreshToken
     await user.save({validateBeforeSave :false})
return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"something went wrong in gerating refresh and access token")
    }
}


const resisterUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation-not empty
  // check if user already exist
  // check for images,checkfor avatar
  // upload them to cloudinary,avatar
  // create user object-create entry in data base
  //remove password and refresh token field from respons
  //check for user creation
  //return response




 
  const {fullname,email,username,password,} = req.body

// console.log("email: ",email)
// if(fullname===""){
// throw new ApiError(400,"fullnameis required")
// }
// console.log(req.body)
if(
    [fullname,email,username,password].some((field)=>{
field?.trim()===""
    })
)
{
    throw new ApiError(400,"all field are required")
}

 const existedUser = await User.findOne({
    $or:[{username},{email}]
    //Array
})
if(existedUser){
    throw new ApiError(400,"user already exist")
}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

console.log(req.files)
if(!avatarLocalPath){
throw new ApiError(400,"avatar is requiredd")
}

const avatar =  await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(500,"avatar upload failednbnnbnbn")
}
const user = await User.create({
    fullname,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || null
})

const createdUser = await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
    throw new ApiError(500,"user creation failed")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)
//req.body
//[].some((s)=>{
  //  s.trim()===""})
//User.findOne({
//    $or[lwkdj,djhei]})
//    req.files.avatar[0].path
//    user =User.create({
//})
//  User.findById(user._id).select(-shgwdh)
//at last we also returning
});


const loginUser = asyncHandler(async(req,res)=>{
// req.body
// check if empty
//find the use
// password check 
// access and refresh token
// sent cookie           
const {email,username,password} = req.body
if(!(username || email)){
    throw new ApiError(400,"username or password is required")
}
const user = await User.findOne(
    {$or: [{username},{email}]}
   )

   if(!user){
    throw new ApiError(404,"user doesnot exist")
   }

 const passValid = await user.isPasswordCorrect(password)
if(!passValid){
    throw new ApiError(404,"Invalid user Crendential")
}
    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)
    
  const loggedInUser =  await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly : true,
    secure:true
  }// cookie should not be changed in frontend
  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User logged succeesfully"
    )
  )
});


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
        const options = {
            httpOnly : true,
            secure:true
          }
          return res.status(200)
          .clearCookie("accessToken",options)
          .clearCookie("refreshToken",options)
          .json(new ApiResponse(200,{},"User Logged Out"))
})



const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})
const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword} = req.body
   const user = User.findById(req.user._id)
   if(!user){
    throw new ApiError(400,"could not find user")
   }
 passwordValidation = user.isPasswordCorrect(oldPassword)
 if(!passwordValidation){
    throw new ApiError(400,"Invalid old password")
 }
 user.password = newPassword
 user.save({validateBeforeSave:false})
 return res
 .status(200)
 .json(new ApiResponse(200,{},"Password changed successfully"))
 

})


const getCurrentUser = asyncHandler(async(req,res)=>{
//because of middleaware
return res
.status(200)
.json( new ApiResponse(200,req.user,"User fetched successfully"))
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
const {fullName,email}= req.body
if (!fullName || !email) {
    throw new ApiError(400, "All fields are required")
}

const user = User.findByIdAndUpdate(req.user?._id,{
    $set:{
        fullName,
        email:email
    }
},{new:true})
.select("-password")

res.status(200)
.json(new ApiResponse(200,user,"Account details updated successfully"))

})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    
})



export { resisterUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser
,updateAccountDetails    
};
