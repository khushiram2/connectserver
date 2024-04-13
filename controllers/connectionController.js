import dev_db_session from "../index.js";




const searchConnectionsByNameOrCity=async (req,res)=>{
  try {
    const driver=await dev_db_session()
    const session=driver.session()
   const {name}=req.query
    if(!name) return res.status(201).send({message:"please enter a name"});
      const query = `
    MATCH (user:User {id: $userId})-[:FRIEND*1..6]-(friend:User)
    WHERE toLower(friend.name) CONTAINS toLower($sanitizedName) OR toLower(friend.address) CONTAINS toLower($sanitizedName) 
    RETURN DISTINCT {
    id:friend.id,
    name:friend.name,
    avatar:friend.avatar,
    bio:friend.bio
} AS f;
  `;
    const result=await session.run(query,{userId:req.user.id,sanitizedName:name})
	const user=result.records[0].get('f')
    session.close()
    if (result.records.length > 0) {
      const friends = result.records.map(record => record.get("f"));
      res.send(friends);
      console.log(`${friends.length} friends found.`);
    } else {
      res.send([]);
      console.log("No friends with similar names found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"internal server error"});
  }
}
