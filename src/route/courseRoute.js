import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import permitTo from './../middleware/permitTo';
import catchAsync from "../services/cathAsync.js";


const courseRouter = express.Router();

courseRouter.route("/courses").post(isAuthenticated,permitTo("admin"),catchAsync(createCourse)).get(catchAsync(getCourses))
courseRouter.route("/course/:id").get(catchAsync(getCourseById)).patch(isAuthenticated,permitTo("admin"),catchAsync(updateCourse)).delete(isAuthenticated,permitTo("admin"),catchAsync(deleteCourse))


export default courseRouter