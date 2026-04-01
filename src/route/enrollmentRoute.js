import express from "express";

import { enrollStudent, updateEnrollmentStatus, getEnrollments } from "../controller/enrollmentController.js";
import catchAsync from "../services/cathAsync.js";
import permitTo from "../middleware/permitTo.js";
import isAuthenticated from "../middleware/isAuthenticate.js";


const enrollmentRouter = express.Router();

enrollmentRouter.route("/enroll").post(isAuthenticated,catchAsync(enrollStudent)).get(isAuthenticated,permitTo("admin"),catchAsync(getEnrollments))
enrollmentRouter.route("/enroll/:id").patch(isAuthenticated,permitTo("admin"),catchAsync(updateEnrollmentStatus));


export default enrollmentRouter