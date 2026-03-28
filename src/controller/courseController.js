import Course from "../models/courseModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";

// Create course
export const createCourse = async (req, res) => {
  const { title, description, price, duration, category, teacher } = req.body;

  if (!title || !description || !price || !duration || !category || !teacher)
    return res.status(400).json({ message: "All fields required" });

  const exist = await Course.findOne({ title });
  if (exist) return res.status(400).json({ message: "Course title already exists" });

  const categoryExists = await Category.findById(category);
  if (!categoryExists) return res.status(404).json({ message: "Category not found" });

  const teacherExists = await User.findById(teacher);
  if (!teacherExists || teacherExists.role !== "admin")
    return res.status(404).json({ message: "Teacher not found or invalid" });

  const course = await Course.create({ title, description, price, duration, category, teacher });
  res.status(201).json({ message: "Course created", data: course });
};

// Get all courses
export const getCourses = async (req, res) => {
  const courses = await Course.find().populate("category", "name").populate("teacher", "userName");
  res.status(200).json({ data: courses });
};

// Get single course
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate("category", "name").populate("teacher", "userName");
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json({ data: course });
};

// Update course
export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.status(200).json({ message: "Course updated", data: course });
};

// Delete course
export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Course deleted" });
};