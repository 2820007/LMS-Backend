import express from "express";

import { totalCourses, totalStudents, totalPayments, allEnrollments } from "../controller/adminController.js";
import catchAsync from "../services/cathAsync.js";

const adminRouter = express.Router();



adminRouter.route("/total-courses").get(catchAsync(totalCourses));
adminRouter.route("/total-students").get(catchAsync(totalStudents));
adminRouter.route("/total-payments").get(catchAsync(totalPayments));
adminRouter.route("/enrollments").get(catchAsync(allEnrollments));



export default adminRouter