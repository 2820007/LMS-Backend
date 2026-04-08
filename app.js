import express from "express"
import dotenv from  "dotenv"
import dbConnect from "./src/db/dbConnect.js"
import userRoute from "./src/route/userRoute.js"



import cookieParser from "cookie-parser"
import cors from "cors"
import courseRouter from "./src/route/courseRoute.js"



dotenv.config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))

app.use(cookieParser())

app.use("/image",express.static("public/images"))
dbConnect()
const PORT=process.env.PORT

//base route

app.use("/api/user",userRoute)
app.use("/api/",courseRouter)





app.listen(PORT,()=>{
    console.log(`app listen at port no ${PORT}`)
})




