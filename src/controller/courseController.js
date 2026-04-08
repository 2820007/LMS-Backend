import Course from "../model/courseModel.js"

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