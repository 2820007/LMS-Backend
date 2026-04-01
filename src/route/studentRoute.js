import express from "express";

import { getMyCourses, getCourseLessons, getMyPayments } from "../controller/studentController.js";
import catchAsync from "../services/cathAsync.js";

const studentRouter = express.Router();



studentRouter.route("/myCourses").get(catchAsync(getMyCourses));
studentRouter.route("/courses/:courseId/lessons").get(catchAsync(getCourseLessons));
studentRouter.route("/payments").get(catchAsync(getMyPayments));

export default studentRouter