import express from "express"
import isAuthenticated from "../middleware/isAuthenticate.js"
import catchAsync from "../services/cathAsync.js"
import { deleteMyProfile, getMyProfile, updateMyPassword, updateMyProfile } from "../controller/profileController.js"

const profileRouter=express.Router()



profileRouter.route("/profile").get(isAuthenticated,catchAsync(getMyProfile)).delete(isAuthenticated,catchAsync(deleteMyProfile)).patch(isAuthenticated,catchAsync(updateMyProfile))
profileRouter.route("/changePassword",isAuthenticated,catchAsync(updateMyPassword))

export default profileRouter