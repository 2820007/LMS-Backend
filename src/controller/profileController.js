import User from "../model/userModel.js"

import bcrypt from "bcryptjs"

export const getMyProfile=async(req,res)=>{
    const userId=req.user.id
    const myProfile=await User.findById(userId)
    res.status(200).json({
        data:myProfile,
        message:"Profile fetched successfully.."
    })


}


//update my  profile controller


export const updateMyProfile=async(req,res)=>{
    const {userName,userEmail,userPhoneNumber}=req.body
    const userId=req.user.id
    //updates profile

    const updatedData=await User.findByIdAndUpdate(userId,{
        userName,
        userEmail,
        userPhoneNumber
    },
    {
        runValidators:true,
        new:true
    }
)
    res.status(200).json({
        message:"Profile update successfully..",
        data:updatedData
    })

}



export const deleteMyProfile=async(req,res)=>{
    const userId=req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message:"user Deleted successfully...",
        data:null
    })
}


//update my password

export const updateMyPassword=async(req,res)=>{
    const userId=req.user.id
    const {oldPassword,newPassword,confirmPassword}=req.body
    if(!oldPassword || !newPassword ||!confirmPassword){
        return res.status(400).json({
            message:"Please provide oldPassword, newPassword,confirmNewPassword"
        })
    }

    if(newPassword !==confirmNewPassword){
        return res.status(400).json({
            message:"newPassword and oldPassword din't matched"
        })
    }

    //check hashed  old password
    const userData=await User.findById(userId)
    const  hashedOldPassword=userData.userPassword


    //check if oldPassword is correct or not

     const isOldPasswordCorrect=bcrypt.compareSync(oldPassword,hashedOldPassword)
     if(!isOldPasswordCorrect){
        return res.status(400).json({
            message:"OldPassword did't matched"
        })


     }
     
  userData.userPassword=bcrypt.hashSync(newPassword,12)
  await userData.save()
  res.status(200).json({
    message:"Password change successfully...."
  })
}