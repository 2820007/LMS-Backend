import mongoose from "mongoose";

const { Schema } = mongoose;

const lessonSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default Lesson;