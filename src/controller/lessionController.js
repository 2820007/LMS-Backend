import Lesson from "../models/lessonModel.js";
import Course from "../models/courseModel.js";

// Create lesson
export const createLesson = async (req, res) => {
  const { course, title, description, videoUrl } = req.body;
  if (!course || !title || !description || !videoUrl)
    return res.status(400).json({ message: "All fields required" });

  const courseExists = await Course.findById(course);
  if (!courseExists) return res.status(404).json({ message: "Course not found" });

  const lesson = await Lesson.create({ course, title, description, videoUrl });
  res.status(201).json({ message: "Lesson created", data: lesson });
};

// Get lessons by course
export const getLessonsByCourse = async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId });
  res.status(200).json({ data: lessons });
};

// Update lesson
export const updateLesson = async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lesson) return res.status(404).json({ message: "Lesson not found" });
  res.status(200).json({ message: "Lesson updated", data: lesson });
};

// Delete lesson
export const deleteLesson = async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Lesson deleted" });
};