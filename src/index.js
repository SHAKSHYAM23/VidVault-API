// require("dotenv").config({path:'./env'})
import dotenv from "dotenv"
import app from "./app.js"
import connectDb from "./db/index.js"
 
dotenv.config(
    {
        path:"./env"
    }
)

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8010,()=>{
        console.log(`App is listning in port ${process.env.PORT}`)
    })
})   //basic of express
.catch((err)=>{
console.log("MOngoDb nhi ho paya cooneexbcj ",err)
})

//connect kar diya mongoose se















// import express from "express"

//  const app = express()
// ;(  async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, )

//        app.on('error',(error)=>{
// console.log("Error: ",error);
// throw error

// // app.listen(process.env.PORT,()=>
// // {
// //     console.log(`Example app listening on port ${process.env.PORT}`)
// // });

//        })
//     } catch (error) {
//         console.error("Error: ", error)
//     }
// })()


// iffe=>immediately invoked function expression
// it is used to run the function immediately
// it is used to avoid the global scope
// it is used to avoid the variable name conflict
// it is used to avoid the variable name overriding
// it is used to avoid the variable name redeclaration
// it is used to avoid the variable name shadowing
// it is used to avoid the variable name hoisting


