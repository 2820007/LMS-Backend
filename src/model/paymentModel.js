import mongoose from "mongoose";

const { Schema } = mongoose;

// Enum replacements in JS
const Status = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
};

const PaymentMethod = {
  KHALTI: "khalti",
  ESEWA: "esewa",
};

const paymentSchema = new Schema({
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: "Enrollment",
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: [Status.COMPLETED, Status.PENDING, Status.FAILED],
    default: Status.PENDING,
  },

  paymentMethod: {
    type: String,
    enum: [PaymentMethod.ESEWA, PaymentMethod.KHALTI],
    default: PaymentMethod.KHALTI,
  },
});

const Payment =
  mongoose.models?.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;