import bcrypt from "bcryptjs"

export async function hashPassword (password) {
  try {
    const hashedPassword=await bcrypt.hash(password,10)
    return hashedPassword  
  } catch (error) {
    throw new Error("error hashing password"+error.message)
  }
}


export async function comparePassword(originalPassword,hashedPassword){
try {
 const match = await bcrypt.compare(originalPassword,hashedPassword) 
    return match
} catch (error) {
  throw new Error("error hashing password"+error.message)
}
}
