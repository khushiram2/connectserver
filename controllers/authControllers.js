import {hashPassword,comparePassword} from '../utils/passwordUtils.js'
import axios from "axios";
import {registerNewUser,findUserByPhoneOrEmail} from "../database/queries.js"
import dev_db_session from '../index.js'
import crypto from "crypto"
import {genNewToken} from "../utils/tokenUtils.js";

export const registerController=async (req,res)=>{
	try{
    const driver=await dev_db_session()
    const session=driver.session()
		const {name,age,phone,email,password,userLocation}=req.body;
		const hashedPassword=await hashPassword(password)
		const newUUID=crypto.randomUUID();
		const result=await session.run(registerNewUser,{id:newUUID,name,email,age,hashedPassword,phone,latitude:userLocation.lat,longitude:userLocation.lon,location:userLocation.name})
		const user=result.records[0].get('u')
    delete user.properties.password
   user.properties.token=await genNewToken(user.properties) 
    session.close()
		res.status(200).send({message:"user registered sucessfully",data:user})
	}catch(error){
		console.log(error)
		res.status(500).send({message:"internal server error"})

	}

}


export const loginController=async (req,res) => {
  try {
    const driver=await dev_db_session()
    const session =driver.session()
    const {email,password,phone}=req.body;
    let detail;
    if(email){
      detail=email
    }
    if(phone){
      detail=phone
    }
    
    const result =await session.run(findUserByPhoneOrEmail,{detail});
    const user=result.records[0].get("u");
    if(!user) return res.status(201).send({message:"invalid credentials please try again"})
    const match = await comparePassword(password,user.properties.password) 
    if(!match) return res.status(201).send({message:"invalid credentials please try again"})
    delete user.properties.password
    user.properties.token=genNewToken({...user.properties})
    session.close()
    res.status(200).send({message:"user logged in sucessfully",data:user.properties})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"internal server error"})
  }
}

// export const verifyOAUTHToken=()=>{
//   try {
//    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
//     if (response.status!==200) {
//       throw new Error(`Failed to verify token: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error verifying Google token:', error.message);
//   }
// }
