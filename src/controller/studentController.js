import Enrollment from "../models/enrollmentModel.js";
import Lesson from "../models/lessonModel.js";
import Course from "../models/courseModel.js";
import Payment from "../models/paymentModel.js";

// Get my courses
export const getMyCourses = async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id, enrollmentStatus: "approve" })
    .populate("course", "title description price duration teacher")
    .populate("student", "userName");

  res.status(200).json({ data: enrollments });
};

// Get lessons of a course
export const getCourseLessons = async (req, res) => {
  const { courseId } = req.params;

  const lessons = await Lesson.find({ course: courseId });
  res.status(200).json({ data: lessons });
};

// Get my payments
export const getMyPayments = async (req, res) => {
  const payments = await Payment.find().populate({
    path: "enrollment",
    match: { student: req.user._id },
    populate: { path: "course", select: "title" },
  });
  const filteredPayments = payments.filter((p) => p.enrollment);
  res.status(200).json({ data: filteredPayments });
};