import express from "express"
import { forgetPassword, getMe, logout, resetPassword, updateProfile, userLogin, userRegister, verifyOtp } from "../controller/userController.js"
import catchAsync from "../services/cathAsync.js"
import isAuthenticated from "../middleware/isAuthenticate.js"
import { singleUpload } from './../middleware/upload.js';

const userRoute=express.Router()

userRoute.route("/register").post( catchAsync(userRegister))
userRoute.route("/profile/update").put(isAuthenticated,singleUpload ,catchAsync(updateProfile))



userRoute.route("/login").post(catchAsync(userLogin))
userRoute.route("/getMe").get(isAuthenticated, catchAsync(getMe))
userRoute.route("/logout").get( catchAsync(logout))
userRoute.route("/forgetPassword").post(catchAsync(forgetPassword))
userRoute.route("/verifyOtp").post(catchAsync(verifyOtp))
userRoute.route("/resetPassword").post(catchAsync(resetPassword))



export default userRoute