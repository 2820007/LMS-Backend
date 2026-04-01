import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../services/sendEmail.js";
import User from "../model/userModel.js";


export const userRegister = async (req, res) => {
  const { userEmail, userPassword, userPhoneNumber, userName } = req.body;


  const userImage = req.file ? req.file.filename : null;

  if (!userEmail || !userPassword || !userPhoneNumber || !userName) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide email, password, phoneNumber and username",
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
    userPhoneNumber,
    userEmail,
    userPassword: hashedPassword,
    userImage, 
  });

  return res.status(201).json({
    status: 201,
    success: true,
    message: "User Registered Successfully",
  });
};

// ================= LOGIN =================
export const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide email and password",
    });
  }

  const userFound = await User.findOne({ userEmail });

  if (!userFound) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "User with email is not registered",
    });
  }

  const isMatched = await bcrypt.compare(
    userPassword,
    userFound.userPassword
  );

  if (!isMatched) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Credential not matched",
    });
  }

  const token = jwt.sign(
    { id: userFound._id, email: userFound.userEmail },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );

  return res.status(200).json({
    status: 200,
    success: true,
    message: "Login successfully",
    token,
    data: userFound, // 🔥 now frontend can access image
  });
};

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