import express from "express";

import { createPayment, getPayments, getStudentPayments } from "../controller/paymentController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import catchAsync from "../services/cathAsync.js";

const paymentRouter = express.Router();

paymentRouter.route("/payment").post(isAuthenticated,catchAsync(createPayment)).get(catchAsync(getPayments))
paymentRouter.route("/myPayments").get(isAuthenticated,catchAsync(getStudentPayments))

export default paymentRouter