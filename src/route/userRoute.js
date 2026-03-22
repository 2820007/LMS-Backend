import express from "express"
import { userRegister } from "../controller/userController.js"
const userRoute=express.Router()

userRoute.route("/register").post(userRegister)

export default userRoute