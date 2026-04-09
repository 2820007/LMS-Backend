import Course from "../model/courseModel.js"
import cloudinary from "../services/cloudinary.js"
import getDatUri from "../services/dataUri.js"

export  const createCourse=async(req,res)=>{

    const {courseTitle,category}=req.body
    if(!courseTitle || !category){
        return res.status(400).json({
            status:400,
            success:false,
            message:"All fields are required"
        })
    }

    const course=await Course.create({
        courseTitle,
        category,
        creater:req.userInfo
    })
    return res.status(201).json({
        success:true,
        message:"Course created successfully",
        course
    })

}


export const getPublishedCourse=async(req,res)=>{
    const courses=await Course.find({isPublished:true})
    if(!courses){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Course not found"
        })

    }
    return res.status(200).json({
        success:true,
        courses
    })
}




export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userInfo._id;

    const courses = await Course.find({
      creater: userId
    });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
        courses: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};







export const editCourse=async(req,res)=>{
  const courseId=req.params.courseId
  const {courseTitle,subTitle,description,category,courseLevel,coursePrice}=req.body
    const file=req.file

  // if(!courseTitle || !subTitle ||!description ||!category ||!courseLevel ||!coursePrice ||!file ||!courseId){
  //   return res.status(400).json({
  //     success:false,
  //     message:"Please provide all fields "
  //   })
  // }

let course=await Course.findById((courseId))
if(!course){
   return res.status(400).json({
      success:false,
      message:"Course not found "
    })

}



let courseThumbnail;


if(file){
  const fileUri=getDatUri(file)
  courseThumbnail=await cloudinary.uploader.upload(fileUri)
}

const updateData={courseTitle,subTitle,description,category,courseLevel,coursePrice,courseThumbnail:courseThumbnail?.secure_url}

course=await Course.findByIdAndUpdate(courseId,updateData,{new:true})
return res.status(200).json({
      success:true,
      message:"Update Data successfully ",
      course
    })



}



export const getCourseById=async(req,res)=>{
  const {courseId}=req.params
  const course=await Course.findById(courseId)

  if(!course){
    return res.status(404).json({
      success:false,
      message:"Course not find with this id "
    })
  }
  return res.status(200).json({
      success:true,
      course
    })
}