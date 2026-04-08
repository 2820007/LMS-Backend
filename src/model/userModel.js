import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
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

   

    userPassword: {
      type: String,
      required: [true, "password must be required"],
     
    },
    photoUrl:{
        type:String,
        default:""
    },

    role: {
      type: String,
      enum: ["student", "instructor"],
      required:true,
      default: "",
    },
    otp: {
      type: Number,
      
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      
    },
     description: {
      type: String,
      
      
    },

    enrolledCourse:[{
      type:Schema.Types.ObjectId,
      ref:"Course"
    }]
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User

