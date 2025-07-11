import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
export default app;
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
})) //third party middleware
app.use(express.json({limit:"16kb"}))//built in middleware
app.use(express.urlencoded({extended:true,limit:"16kb"}))  //built in middleware
app.use(express.static("public"))// if we have to store some file we can use this middleware in the public folder
app.use(cookieParser())   //third party middleware it is used to parse the cookie


//   ROUTESSS

import userRouter from './routes/user.routes.js';

app.use("/api/v1/users",userRouter)
//http://localhost:8000/api/v1/users


















//https://www.geeksforgeeks.org/express-js-express-urlencoded-function/
//https://www.geeksforgeeks.org/express-js-express-static-function/
//app.post("/login",express.json(),(req,res)=>{})  //router level middleware

//express has following type of middleware
//1. built in middleware
//2. third party middleware 
//3. custom middleware
 //routerlevel middleware
    //application level middleware
    //error handling middleware   


//cors full form is cross origin resource sharing
//it is a security feature in the browser
//it is used to prevent the request from one domain to another domain
//to allow the request from one domain to another domain we need to enable cors
//cors is a middleware
//cors is a package that allows the request from one domain to another domain


//express.json() is a middleware
// it is used to parse the incoming request with JSON payloads
// it is used to parse the request body

//express.urlencoded() is a middleware
// it is used to parse the incoming request with urlencoded payloads 


//middleware is a function that has access to the request object(req), the response object(res), and the next function in the application's request-response cycle


//middleware -logging,authentication ,validation


// const loggingMiddleware =(req,res,next)=>{
//    console.log("Logging kar raha hu")
//    next()
// }
// app.use(loggingMiddleware);

// // const authMiddleware =(req,res,next)=>{
// //    console.log("Logging kar raha hu")
// //    next()
// // }
// // const validaMiddleware =(req,res,next)=>{
// //     console.log("Logging kar raha hu")
// //     next()
// //  }

// // all the middleware should be called before the route
// //so it should be at top of the route
//  app.get("/",(req,res)=>{
// res.send("chdohdcohiodw")
//  })


//it is  Application-level middleware
