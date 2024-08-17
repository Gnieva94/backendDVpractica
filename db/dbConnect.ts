import mongoose from "mongoose"
import { config } from "dotenv"
config()
const mongoDbUri = process.env.MONGODB_URI ?? ''
export default async function dbConnect(){
  if(mongoose.connection.readyState >=1) return;
  try {
    await mongoose.connect(mongoDbUri)
    console.log('DB Connected')
  } catch (error) {
    console.log('DB connection error ',error)  
  }
}