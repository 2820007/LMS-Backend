import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { enrollStudent, updateEnrollmentStatus, getEnrollments } from "../controllers/enrollmentController.js";
import catchAsync from "../services/cathAsync.js";
import permitTo from "../middleware/permitTo.js";
import enrollmentRouter from './enrollmentRoute';

const enrollmentRouter = express.Router();

enrollmentRouter.route("/enroll").post(isAuthenticated,catchAsync(enrollStudent)).get(isAuthenticated,permitTo("admin"),catchAsync(getEnrollments))
enrollmentRouter.route("/enroll/:id").patch(isAuthenticated,permitTo("admin"),catchAsync(updateEnrollmentStatus));


export default enrollmentRouter