import express from "express"
import isAuthenticated from "../middleware/isAuthenticate.js"
import catchAsync from "../services/cathAsync.js"
import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourse } from "../controller/courseController.js"
import permitTo from "../middleware/permitTo.js"
import { singleUpload } from "../middleware/upload.js"
const courseRouter=express.Router()

courseRouter.route("/course").post(isAuthenticated,permitTo("instructor"),catchAsync(createCourse))
courseRouter.route("/course/published-course").get(catchAsync(getPublishedCourse))
courseRouter.route("/course/creater").get(isAuthenticated,catchAsync(getCreatorCourses))
courseRouter.route("/course/:courseId").put(isAuthenticated,permitTo("instructor"),singleUpload, catchAsync(editCourse)).get(isAuthenticated,catchAsync(getCourseById))


export default courseRouter