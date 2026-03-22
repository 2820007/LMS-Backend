import User from "../model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../services/sendEmail.js";





export const userRegister=async(req,res)=>{



  const { userEmail, userPassword, userPhoneNumber, userName } = req.body;

  // Validation
  if (!userEmail || !userPassword || !userPhoneNumber || !userName) {
    return res.status(400).json({
      message: "Please provide email, password, phoneNumber and username",
    });
  }

  // Check if email already exists
  const userFound = await User.findOne({ userEmail });

  if (userFound) {
    return res.status(400).json({
      message: "User with that email already registered",
    });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(String(userPassword), 10);

  // Create user
  await User.create({
    userName,
    userPhoneNumber,
    userEmail,
    userPassword: hashedPassword,
  });

  return res.status(201).json({
    message: "User Registered Successfully",
  });
}



export const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  // Use findOne instead of find
  const userFound = await User.findOne({ userEmail });

  if (!userFound) {
    return res.status(404).json({
      message: "User with email is not registered",
    });
  }

  // Compare password safely
  const isMatched = bcrypt.compareSync(userPassword, userFound.userPassword);

  if (!isMatched) {
    return res.status(400).json({
      message: "Credential not matched....",
    });
  }

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  return res.status(200).json({
    message: "Login successfully",
    token,
  });
};




//forget password


export const forgetPassword=async(req,res)=>{
    const {userEmail}=req.body
   
    if(!userEmail){
        return res.status(400).json({
            message:"Please provide an email"
        })
    }

    //check the user with  that email
    const existUser= await User.find({userEmail:userEmail})

    if(existUser.length ==0){
        return res.status(404).json({
            message:"User with that email is not registered"
        })
    }


    //generate otp

    const otp=Math.floor(1000+ Math.random()*9000)

       existUser[0].otp=otp
       await existUser[0].save()

    await sendEmail({
        email:userEmail,
        subject:"Otp for digitalFood forgetPassword",
        message:`Your otp is${otp}. Donot share with any one`
    })
    res.status(200).json({
        message:"Email sent successfully"
    })

}


//Verify Otp

export const verifyOtp= async(req,res)=>{
    const {userEmail,otp}=req.body
    if(!userEmail || !otp){
        return res.status(400).json({
            message:"Please provide email,otp"
        })
    }

    //check if that  otp is correct  or not fo that email

    const userExists=await User.find({userEmail:userEmail})
    if(userExists.length ==0){
        return res.status(404).json({
            message:"Email is not registered"
        })
    }

    if(userExists[0].otp !== otp){
        res.status(400).json({
            message:"Invalid"
        })
    }
    else{
        //dispose the otp so cannot be used next time the same otp
        userExists[0].otp=undefined
        userExists[0].isOtpVerified =true
        await userExists[0].save()
        res.status(200).json({
            message:"Otp is correct"
        })

    }
}


export const resetPassword=async(req,res)=>{
    const {userEmail,newPassword,confirmPassword}=req.body;
    if(!userEmail || !newPassword || !confirmPassword){
        return res.status(400).json({
            message:"Please provide email, newPassword and confirmPassword"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message:"newPassword and confirmPassword is not match"
        })
    }

    const userExists=await User.find({userEmail:userEmail})

    if(userExists.length ==0){
        return res.status(400).json({
            message:"User email not registered"
        })
    }
    if(userExists[0].isOtpVerified !== true){
        return res.status(403).json({
            message:"You cannot perform this action"
        })
    }


    userExists[0].userPassword=bcrypt.hashSync(newPassword,10)
    userExists[0].isOtpVerified=false
    await userExists[0].save()

    res.status(200).json({
        message:"Password changed successfully.."
    })

}