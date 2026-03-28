import express from "express";
import { protect, student } from "../middleware/auth.js";
import { getMyCourses, getCourseLessons, getMyPayments } from "../controllers/studentController.js";
import catchAsync from "../services/cathAsync.js";

const studentRouter = express.Router();



studentRouter.route("/myCourses").get(catchAsync(getMyCourses));
studentRouter.route("/courses/:courseId/lessons").get(catchAsync(getCourseLessons));
studentRouter.route("/payments").get(catchAsync(getMyPayments));

export default studentRouter