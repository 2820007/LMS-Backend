import Payment, { PaymentMethod, PaymentStatus } from "../model/paymentModel.js";
import Enrollment from "../model/enrollmentModel.js";

// Create Payment
export const createPayment = async (req, res) => {
  const { enrollmentId, amount, paymentMethod } = req.body;

  if (!enrollmentId || !amount || !paymentMethod)
    return res.status(400).json({ message: "All fields required" });

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

  if (!Object.values(PaymentMethod).includes(paymentMethod))
    return res.status(400).json({ message: "Invalid payment method" });

  const payment = await Payment.create({
    enrollment: enrollmentId,
    amount,
    paymentMethod,
    status: PaymentStatus.Completed,
  });

  res.status(201).json({ message: "Payment successful", data: payment });
};

// Get all payments (admin)
export const getPayments = async (req, res) => {
  const payments = await Payment.find().populate({
    path: "enrollment",
    populate: { path: "student course", select: "userName title" },
  });
  res.status(200).json({ data: payments });
};

// Get student payments
export const getStudentPayments = async (req, res) => {
  const payments = await Payment.find().populate({
    path: "enrollment",
    match: { student: req.user._id },
    populate: { path: "course", select: "title" },
  });

  const filteredPayments = payments.filter((p) => p.enrollment); // remove null
  res.status(200).json({ data: filteredPayments });
};