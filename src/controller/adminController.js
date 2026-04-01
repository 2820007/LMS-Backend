import Course from "../model/courseModel.js";
import Enrollment from "../model/enrollmentModel.js";
import Payment from "../model/paymentModel.js";
import User from "../model/userModel.js";

// Total courses
export const totalCourses = async (req, res) => {
  const count = await Course.countDocuments();
  res.status(200).json({ totalCourses: count });
};

// Total students
export const totalStudents = async (req, res) => {
  const count = await User.countDocuments({ role: "student" });
  res.status(200).json({ totalStudents: count });
};

// Total payments
export const totalPayments = async (req, res) => {
  const payments = await Payment.find();
  const totalAmount = payments.reduce((acc, p) => acc + p.amount, 0);
  res.status(200).json({ totalPayments: payments.length, totalAmount });
};

// List enrollments
export const allEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate("student", "userName")
    .populate("course", "title");
  res.status(200).json({ data: enrollments });
};