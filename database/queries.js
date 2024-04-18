export const registerNewUser=`
		CREATE (u:User {id:$id,name:$name,password:$hashedPassword,email:$email,age:$age,phone:$phone,location:$location,latitude:$latitude,longitude:$longitude})
		Return u;
		`
export const findUserByPhoneOrEmail=`MATCH (u:User)
    WHERE  u.email = $detail OR u.phone = $detail
    RETURN u;`

export const updateRelation=`MATCH (user1:User {id: $userId1}), (user2:User {id: $userId2})
MERGE (user1)-[:FRIEND]->(user2)
MERGE (user1)-[:$NEW_RELATION]->(user2) 
RETURN user1, user2 ;`
  export const contactsUpload=`
  UNWIND $contacts AS person
  MERGE (u:USER {number: person.number})
  ON CREATE SET u.name = person.name
`
