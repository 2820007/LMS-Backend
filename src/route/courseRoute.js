import express from "express"
import isAuthenticated from "../middleware/isAuthenticate.js"
import catchAsync from "../services/cathAsync.js"
import { createCourse, getCreatorCourses, getPublishedCourse } from "../controller/courseController.js"
import permitTo from "../middleware/permitTo.js"
const courseRouter=express.Router()

courseRouter.route("/course").post(isAuthenticated,permitTo("instructor"),catchAsync(createCourse))
courseRouter.route("/course/published-course").get(catchAsync(getPublishedCourse))
courseRouter.route("/course/creater").get(isAuthenticated,catchAsync(getCreatorCourses))

export default courseRouter