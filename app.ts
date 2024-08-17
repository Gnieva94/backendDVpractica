import express from 'express'
import { config } from 'dotenv'
import dbConnect from './db/dbConnect'
import router from './routes'
config()
const PORT = parseInt(process.env.PORT ?? '3000')
const HOST = process.env.HOST ?? 'localhost'
const app = express();
app.use(express.json())
app.use('/api',router)
dbConnect()
app.listen(PORT,HOST,()=>{console.log(`http://${HOST}:${PORT}`)})