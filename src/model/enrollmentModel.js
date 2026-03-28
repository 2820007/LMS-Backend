import mongoose from "mongoose";

const { Schema } = mongoose;

// Enum replacement in JS
const EnrollmentStatus = {
  APPROVE: "approve",
  REJECT: "reject",
  PENDING: "pending",
};

const enrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  enrollmentStatus: {
    type: String,
    enum: [
      EnrollmentStatus.APPROVE,
      EnrollmentStatus.REJECT,
      EnrollmentStatus.PENDING,
    ],
    default: EnrollmentStatus.PENDING,
  },
  whatsapp: String,
});

const Enrollment =
  mongoose.models.Enrollment ||
  mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;