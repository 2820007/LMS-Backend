import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
    userEmail: {
      type: String,
      unique:true,
      lowercase:true,
      require: [true, "userEmail must be provided"],
    },
    userName: {
      type: String,
      require: [true, "userName must be provided"],
    },

    userPhoneNumber: {
      type: String,
      required: [true, "phone must be provided"],
    },

    userPassword: {
      type: String,
      required: [true, "password must be required"],
     
    },
      image: {
      type: String,
      
     
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    otp: {
      type: Number,
      
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      
    },

  },
  {
    timestamps: true,
  },
)


const User=mongoose.model("User",userSchema)
export default User