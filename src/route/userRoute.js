import express from "express"
import { forgetPassword, resetPassword, userLogin, userRegister, verifyOtp } from "../controller/userController.js"
import catchAsync from "../services/cathAsync.js"

const userRoute=express.Router()

userRoute.route("/register").post(catchAsync(userRegister))
userRoute.route("/login").post(catchAsync(userLogin))
userRoute.route("/forgetPassword").post(catchAsync(forgetPassword))
userRoute.route("/verifyOtp").post(catchAsync(verifyOtp))
userRoute.route("/resetPassword").post(catchAsync(resetPassword))



export default userRoute