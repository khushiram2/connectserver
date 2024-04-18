import jwt from "jsonwebtoken";
export async function verifyToken() {
  try {
    const verified = await jwt.verify(token,process.env.JWT_SECRET)
    return verified.payload
  } catch (error) {
  throw new Error("error verifying token "+error.message)  
  }
}


export async function genNewToken(payload) {
  try {
    const token = await jwt.sign({...payload},process.env.JWT_SECRET)
   return token 
  } catch (error) {  
  throw new Error("error verifying token "+error.message)  
  }
}


// export async function verify(token) {
//     try {
//       const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.CLIENT_ID, 
//         });
//         const payload = ticket.getPayload();
//         const userid = payload['sub'];
//         console.log(payload)
//    } catch (error) {
//         console.log(error)
//     }
// }
//
//

