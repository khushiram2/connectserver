import express from "express"
import * as dotenv from "dotenv"
import db_connection from "./connection/dbconnection.js"
import devDatabaseConnection from "./connection/connectionPool.js"
import {authRouter} from "./routes/authRoutes.js"
import cors from 'cors'
import {contactsRouter} from "./routes/contacts.js"
dotenv.config()




const dev_db_session= devDatabaseConnection

const app=express();
app.use(cors())
app.use(express.json());
app.use("/contacts",contactsRouter)
app.use("/auth",authRouter)
app.get("/",(req,res)=>{
res.send("working fine")
})


app.listen(process.env.PORT,function(){
console.log(`app started on http://localhost:${process.env.PORT}`)
})
export default dev_db_session
