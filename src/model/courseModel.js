import mongoose from "mongoose"

const courseSchema=new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true,
    },
     courseThumbnail:{
        type:String,
      
    },
    subTitle:{
        type:String,
    },
    description:{
        type:String,

    },
    category:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        enum:["Beginner","Medium","Advance"]
    },
    coursePrice:{
        type:Number,
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    lecture:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    creater:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})


const Course=mongoose.model("Course",courseSchema)
export default Course