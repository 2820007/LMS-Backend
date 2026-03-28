import Enrollment, { EnrollmentStatus } from "../models/enrollmentModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// Enroll student
export const enrollStudent = async (req, res) => {
  const { studentId, courseId, whatsapp } = req.body;

  const student = await User.findById(studentId);
  const course = await Course.findById(courseId);
  if (!student || student.role !== "student") return res.status(404).json({ message: "Invalid student" });
  if (!course) return res.status(404).json({ message: "Course not found" });

  const exist = await Enrollment.findOne({ student: studentId, course: courseId });
  if (exist) return res.status(400).json({ message: "Already enrolled" });

  const enrollment = await Enrollment.create({ student: studentId, course: courseId, whatsapp });
  res.status(201).json({ message: "Enrollment created", data: enrollment });
};

// Approve or Reject enrollment
export const updateEnrollmentStatus = async (req, res) => {
  const { status } = req.body;
  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

  if (!Object.values(EnrollmentStatus).includes(status))
    return res.status(400).json({ message: "Invalid status" });

  enrollment.enrollmentStatus = status;
  await enrollment.save();
  res.status(200).json({ message: "Enrollment updated", data: enrollment });
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find().populate("student", "userName").populate("course", "title");
  res.status(200).json({ data: enrollments });
};