import express from "express"
import dotenv from  "dotenv"
import dbConnect from "./src/db/dbConnect.js"
import userRoute from "./src/route/userRoute.js"
import profileRouter from "./src/route/profileRoute.js"


dotenv.config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnect()
const PORT=process.env.PORT

//base route

app.use("/api/user",userRoute)
app.use("/api/user",profileRouter)




app.listen(PORT,()=>{
    console.log(`app listen at port no ${PORT}`)
})




