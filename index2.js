require('dotenv').config()

//Importing third party modules
const express = require('express')
const request=require('requests')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')


//Connecting to MongoDB database
mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log('Connection to database successful');
}).catch(err=>console.log(err.message))

const server=express()

//Setting the view engine
server.set('view engine', 'ejs') 
//Enabling access to the cookie object
server.use(cookieParser())

// support parsing of application/json type post data
server.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: true }));

//Routes
const mpesa_routes=require('./routes/mpesa_routes')
const user_routes=require('./routes/user')


server.use('/daraja',mpesa_routes)
server.use('/user',user_routes)




server.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})




