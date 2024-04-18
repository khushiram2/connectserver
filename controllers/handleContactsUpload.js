import dev_db_session  from "../index.js";
import {contactsUpload} from "../database/queries.js"

export const addContacts=async (req,res)=>{
  try {
   const {contacts}= req.body.body;
    const driver=await dev_db_session()
    const session=driver.session()
const result= await session.run(contactsUpload, { contacts })
session.close()
    res.send("recieved")
  } catch (error) {
    console.log(error);
res.send("error")
  }
}


















