import dotenv from "dotenv";        // (1-2) Always Fix at TOP:
dotenv.config();     

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import passport from "passport";
import userRoute from "./routes/userRoute.js"
import "./config/passport-jwt-strategy.js"



const app = express();
const port = process.env.PORT || 3001
const DATABASE_URL=process.env.DATABASE_URL;

// This will solve CORS Policy ERROR 
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// JSON
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

// Route call 
app.use('/api/user',userRoute);




// Database Connection call
connectDB(DATABASE_URL);

// BACKEND PORT Running
app.listen(port,()=>{
    console.log('Server is Running on PORT ',port);
});

// To Test the Server on Browser
app.get('/',(req,res)=>{
    res.send('Server is Live');
});

