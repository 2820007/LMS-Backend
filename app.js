import express from "express"
import dotenv from  "dotenv"
import dbConnect from "./src/db/dbConnect.js"
import userRoute from "./src/route/userRoute.js"
import profileRouter from "./src/route/profileRoute.js"
import categoryRouter from "./src/route/categoryRoute.js"
import courseRouter from './src/route/courseRoute.js';
import lessionRouter from './src/route/lessionRoute.js';
import enrollmentRouter from './src/route/enrollmentRoute.js';
import paymentRouter from './src/route/paymentRoute.js';
import studentRouter from './src/route/studentRoute.js';
import adminRouter from './src/route/adminRoute.js';
import cors from "cors"


dotenv.config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))

app.use("/image",express.static("public/images"))
dbConnect()
const PORT=process.env.PORT

//base route

app.use("/api/user",userRoute)
app.use("/api/user",profileRouter)
app.use("/api",categoryRouter)
app.use("/api",courseRouter)
app.use("/api",lessionRouter)
app.use("/api",enrollmentRouter)
app.use("/api",paymentRouter)
app.use("/api/student",studentRouter)
app.use("/api/admin",adminRouter)




app.listen(PORT,()=>{
    console.log(`app listen at port no ${PORT}`)
})




