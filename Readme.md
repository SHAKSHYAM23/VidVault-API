 gitignore is created by gitignore generator whose url is  https://mrkandreev.name/snippets/gitignore-generator/



 package.json type ko module change kiya hai


 npm init

 Installing nodemon
 npm i -D nodemon
 it is a dev dependency

  "scripts": {
    "dev": "nodemon 03project/src/index.js"
  },


  installing prettier
  npm i -D prettier
  

  npm i mongoose express dotenv

  mongodb atlas
  https://cloud.mongodb.com/v2/67db0abfbc01212e958e0501#/security/network/accessList
   
app.use()
npm i cookie-parser
   npm i cors

   nodejs error  read about these

   

DB is another continent, hence use promises or try-catch with async-await whenever you are connecting to any database

1. Assignments : 
    - Read about process and exit() method in nodejs
    - Console log karke dekho joh object DB connect hone par return hota hai.

2. Tips: 
    - Read the errors before referring to any material for resolving.
    - write error statements in a clear manner, debuggging mei help karegi.
    - env file mei change karte hi, server ko restart karna hi padega, no other option, nodemon env files ka track nahi rakhta.

const promiseOne = new Promise(function(resolve, reject){
    //Do an async task
    // DB calls, cryptography, network
    setTimeout(function(){
        console.log('Async task is compelete');
        resolve()
    }, 1000)
})

promiseOne.then(function(){
    console.log("Promise consumed");
})

new Promise((resolve,reject)=>{
    setTimeout(function(){
        console.log("Async task 2");
        resolve()
    }, 1000)
}).then(()=>{
    
})

new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("Async task 2");
        resolve()
    }, 1000)

}).then(function(){
    console.log("Async 2 resolved");
})

const promiseThree = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve({username: "Chai", email: "chai@example.com"})
    }, 1000)
})

promiseThree.then(function(user){
    console.log(user);
})

const promiseFour = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error) {
            resolve({username: "hitesh", password: "123"})
        } else {
            reject('ERROR: Something went wrong')
        }
    }, 1000)
})

 promiseFour
 .then((user) => {
    console.log(user);
    return user.username
}).then((username) => {
    console.log(username);
}).catch(function(error){
    console.log(error);
}).finally(() => console.log("The promise is either resolved or rejected"))



const promiseFive = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error) {
            resolve({username: "javascript", password: "123"})
        } else {
            reject('ERROR: JS went wrong')
        }
    }, 1000)
});

async function consumePromiseFive(){
    try {
        const response = await promiseFive  //time lagta hai isleye await use kar rahwe hai
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

consumePromiseFive()

// async function getAllUsers(){
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')

//         const data = await response.json()
//         console.log(data);
//     } catch (error) {
//         console.log("E: ", error);
//     }
// }

//getAllUsers()

fetch('https://api.github.com/users/hiteshchoudhary')
.then((response) => {
    return response.json()
})
.then((data) => {
    console.log(data);
})
.catch((error) => console.log(error))

// promise.all
// yes this is also available, kuch reading aap b kro.