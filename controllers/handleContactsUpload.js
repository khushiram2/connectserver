import dev_db_session  from "../index.js";


export const addContacts=(req,res)=>{
  try {
   const {data}= req.body;
    console.log(data)
    res.send("recieved")
  } catch (error) {
    console.log(error);
res.send("error")
  }
}


















