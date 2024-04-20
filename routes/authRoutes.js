import {Router} from "express";
import {registerController,loginController,sendOTP}from "../controllers/authControllers.js" 
import {uniqueEmail} from "../middlewares/authMiddleware.js"

const router=Router()

router.get("/test",(req,res)=>{
res.send("working nicely")
})

router.post("/register",uniqueEmail,registerController)
router.post("/login",loginController)
router.post("/sendOTP",sendOTP)

export const authRouter=router
