import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { createPayment, getPayments, getStudentPayments } from "../controllers/paymentController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import catchAsync from "../services/cathAsync.js";

const paymentRouter = express.Router();

paymentRouter.route("/payment").post(isAuthenticated,catchAsync(createPayment)).get(catchAsync(getPayments))
paymentRouter.route("/myPayments").get(isAuthenticated,catchAsync(getStudentPayments))

export default paymentRouter