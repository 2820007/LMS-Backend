import Course from "../model/courseModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";

//  CREATE COURSE
export const createCourse = async (req, res) => {
  const image = req.file?.filename;

  const { title, description, price, duration, category, teacher } = req.body;

  if (!title || !description || !price || !duration || !category || !teacher || !image) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "All fields are required",
    });
  }

  const exist = await Course.findOne({ title });
  if (exist) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Course title already exists",
    });
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Category not found",
    });
  }

  const teacherExists = await User.findById(teacher);
  if (!teacherExists || teacherExists.role !== "admin") {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Teacher not found or invalid",
    });
  }

  const course = await Course.create({
    title,
    description,
    price,
    duration,
    category,
    teacher,
    image,
  });

  res.status(201).json({
    status: 201,
    success: true,
    message: "Course created successfully",
    data: course,
  });
};

// GET ALL COURSES
export const getCourses = async (req, res) => {
  const courses = await Course.find()
    .populate("category", "name")
    .populate("teacher", "userName");

  if (courses.length === 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "No courses found",
      data: [],
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Courses fetched successfully",
    data: courses,
  });
};

//  GET SINGLE COURSE
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide course id",
    });
  }

  const course = await Course.findById(id)
    .populate("category", "name")
    .populate("teacher", "userName");

  if (!course) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Course fetched successfully",
    data: course,
  });
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const image = req.file?.filename;

  // Use || {} to avoid destructure error
  const { title, description, price, duration, category, teacher } = req.body || {};

  // Find existing course
  const oldCourse = await Course.findById(id);
  if (!oldCourse) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Course not found",
    });
  }

  // Only check duplicate if the title is **different**
  if (title && title !== oldCourse.title) {
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Course title already exists",
      });
    }
  }

  // Update the course
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      title: title || oldCourse.title,
      description: description || oldCourse.description,
      price: price || oldCourse.price,
      duration: duration || oldCourse.duration,
      category: category || oldCourse.category,
      teacher: teacher || oldCourse.teacher,
      image: image || oldCourse.image,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: "Course updated successfully",
    data: updatedCourse,
  });
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide course id",
    });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Course not found",
    });
  }

  await Course.findByIdAndDelete(id);

  res.status(200).json({
    status: 200,
    success: true,
    message: "Course deleted successfully",
  });
};