//bcrypt password start
import bcrypt from "bcrypt"
const saltRounds = 10;
//bcrypt password end

//receive plain (password) 
export const securePassword = async(password)=>{
   return await bcrypt.hash(password, saltRounds); 
}

//compare password (password and hash password from db) 
export const comparePassword = async(password, hash)=>{
    return await bcrypt.compare(password, hash); 
 }
