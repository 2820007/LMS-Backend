import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  // lessons: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Lesson",
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;