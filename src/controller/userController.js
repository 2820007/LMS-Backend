import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";
import User from "../model/userModel.js";
import getDatUri from "../services/dataUri.js";
import cloudinary from "../services/cloudinary.js";


export const userRegister = async (req, res) => {
  const { userEmail, userPassword, role, userName } = req.body;



  if (!userEmail || !userPassword || !role || !userName) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide email, password,role and username",
    });
  }

  
  


  const userFound = await User.findOne({ userEmail });

  if (userFound) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "User with that email already registered",
    });
  }
  

  const hashedPassword = await bcrypt.hash(String(userPassword), 10);

  await User.create({
    userName,
    role,
    userEmail,
    userPassword: hashedPassword,
     
  });

  return res.status(201).json({
    status: 201,
    success: true,
    message: "User Registered Successfully",
  });
};




export const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  

  if (!userEmail || !userPassword) {
    return res.status(400).json({
      status:400,
      success:false,
      message: "Please provide email and password",
    });
  }

  // Use findOne instead of find
  const userFound = await User.findOne({ userEmail });

  if (!userFound) {

    return res.status(404).json({
       status:404,
      success:false,
      message: "User with email is not registered",
    });
  }

  // Compare password safely
  const isMatched = await  bcrypt.compare(userPassword, userFound.userPassword);

  if (!isMatched) {
    return res.status(400).json({
       status:400,
      success:false,
      message: "Credential not matched....",
    });
  }

  const token = jwt.sign(
    { 
      id: userFound._id,
      role:userFound.role,
      userEmail:userFound.userEmail

     }
    , process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
  .cookie("token", token, {
    httpOnly: true,                       
    sameSite: "lax",                      
    maxAge: 24 * 60 * 60 * 1000,          
  })
  .status(200)
  .json({
    status: 200,
    success: true,
    message: "Login successfully",
    user: userFound,
    token,
  });
};

export const getMe=async (req,res)=>{
  res.status(200).json({
    status:200,
    success:true,
    message:"user found",
    user:req.userInfo
  })
}


export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
   
    sameSite: "lax",
  }).status(200).json({
    status: 200,
    success: true,
    message: "User logout successfully!",
  });
};


export const updateProfile=async(req,res)=>{
  const userId=req.userInfo
  const {userName,description}=req.body
  const file=req.file
  const fileUri=getDatUri(file)
  let cloudResponse=await cloudinary.uploader.upload(fileUri)
  const user=await User.findById(userId)
  if(!user){
    return res.status(404).json({
    status:404,
    success:false,
    message:"user found",
   
  })
  }

  //update data

  if(userName) user.userName=userName
  if(description) user.description=description
  if(file) user.photoUrl=cloudResponse.secure_url
  await user.save()
   return res.status(200).json({
    status:200,
    success:true,
    message:"profile update successfully",
    user
   
  })

}






// ================= FORGET PASSWORD =================
export const forgetPassword = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide an email",
    });
  }

  const existUser = await User.find({ userEmail });

  if (existUser.length === 0) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "User with that email is not registered",
    });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);

  existUser[0].otp = otp;
  existUser[0].isOtpVerified = false;

  await existUser[0].save();

  await sendEmail({
    email: userEmail,
    subject: "Otp for digitalFood forgetPassword",
    message: `Your otp is ${otp}. Do not share with anyone`,
  });

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Email sent successfully",
  });
};

// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  const { userEmail, otp } = req.body;

  if (!userEmail || !otp) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide email and otp",
    });
  }

  const userExists = await User.find({ userEmail });

  if (userExists.length === 0) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Email is not registered",
    });
  }

  if (String(userExists[0].otp) !== String(otp)) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Invalid OTP",
    });
  }

  userExists[0].otp = undefined;
  userExists[0].isOtpVerified = true;

  await userExists[0].save();

  return res.status(200).json({
    status: 200,
    success: true,
    message: "OTP is correct",
  });
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  const { userEmail, newPassword, confirmPassword } = req.body;

  if (!userEmail || !newPassword || !confirmPassword) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide email, newPassword and confirmPassword",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Passwords do not match",
    });
  }

  const userExists = await User.find({ userEmail });

  if (userExists.length === 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "User email not registered",
    });
  }

  if (userExists[0].isOtpVerified !== true) {
    return res.status(403).json({
      status: 403,
      success: false,
      message: "You cannot perform this action",
    });
  }

  userExists[0].userPassword = await bcrypt.hash(newPassword, 10);
  userExists[0].isOtpVerified = false;

  await userExists[0].save();

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Password changed successfully",
  });
};