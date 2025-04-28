import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app=express()
import connectDB from './db/db.js'
connectDB()
import UserRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/',UserRoutes)



export default app;