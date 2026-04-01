import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import permitTo from './../middleware/permitTo.js';
import catchAsync from "../services/cathAsync.js";
import upload from "../middleware/upload.js";


const courseRouter = express.Router();

courseRouter.route("/courses").post(isAuthenticated,permitTo("admin"),upload.single("image"), catchAsync(createCourse)).get(catchAsync(getCourses))
courseRouter.route("/course/:id").get(catchAsync(getCourseById)).patch(isAuthenticated,permitTo("admin"),upload.single("image"), catchAsync(updateCourse)).delete(isAuthenticated,permitTo("admin"),catchAsync(deleteCourse))


export default courseRouter