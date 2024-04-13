import {hashPassword,comparePassword} from '../utils/passwordUtils.js'
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
		const query=`
		CREATE (u:User {id:$id,name:$name,password:$hashedPassword,email:$email,age:$age,phone:$phone,location:$location,latitude:$latitude,longitude:$longitude})
		Return u;
		`
		const result=await session.run(query,{id:newUUID,name,email,age,hashedPassword,phone,latitude:userLocation.lat,longitude:userLocation.lon,location:userLocation.name})
		const user=result.records[0].get('u')
    delete user.properties.password
   user.properties.token=genNewToken(user.properties,"1d") 
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
    const query=`MATCH (u:User)
    WHERE  u.email = $detail OR u.phone = $detail
    RETURN u;`
    const result =await session.run(query,{detail});
    const user=result.records[0].get("u");
    if(!user) return res.status(201).send({message:"invalid credentials please try again"})
    const match = await comparePassword(password,user.properties.password) 
    if(!match) return res.status(201).send({message:"invalid credentials please try again"})
    delete user.properties.password
    user.properties.token=genNewToken({...user.properties},"1d")
    session.close()
    res.status(200).send({message:"user logged in sucessfully",data:user.properties})
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"internal server error"})
  }
}





