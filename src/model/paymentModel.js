import mongoose from "mongoose";

const { Schema } = mongoose;

// Enum replacements in JS
export const PaymentStatus = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
};

export const PaymentMethod = {
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
    enum: [PaymentStatus.COMPLETED, PaymentStatus.PENDING, PaymentStatus.FAILED],
    default: PaymentStatus.PENDING,
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