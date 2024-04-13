import dev_db_session from '../index.js'





export const uniqueEmail=async(req,res,next)=>{

  try {
    const driver=await dev_db_session()
    const session=driver.session()
    const {email,phone}=req.body
    const query=`
MATCH (u:User)
WHERE u.phone=$phone OR u.email=$email
Return u;
`
    const result = await session.run(query,{email,phone})
    session.close()
    if(result.records.length>0){
      return res.status(200).send({message:"already registered please login"})
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({message:"internal server error"})
  }
}
