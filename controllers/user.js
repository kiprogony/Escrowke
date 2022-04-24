require('dotenv').config()

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')


const create_jwt=(id)=>{
    const token=jwt.sign({id}, process.env.jwt_key,{expiresIn:300})
    return token
}

const User=require('../models/user')

function login_user(req,res,next) {
    User.findOne({email:req.body.email}).exec()
    .then(user=>{
        if (!user) {
            return res.status(401).json({message:'Authentication failed'})
        }else{
            
            bcrypt.compare(req.body.password, user.password, (err,response)=>{
                if (err) {
                    return res.status(401).json({message:'Authentication failed'})
                }
                else
                {
                    const token=create_jwt(user.email)
                    res.cookie('jwt_1',token)
                    req.cookies.jwt=token
                    res.status(303).redirect('/user/make_payment')
                    next()
                }
            })
        }
    })
    .catch(e=>{
        res.status(500).json({
            error:e
        })
        console.log(e.message);
    })

}

async function register_user(req,res,next){
    const user=await User.findOne({email:req.body.email}) 
    .then((user)=>{
        if (user) {
            console.log('Email already exists');
            res.redirect('login')
       
        }else{
            bcrypt.hash(req.body.password,12,(e,hash)=>{
                if (e) {
                    res.json({'error':e})
                }else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        phone_number:req.body.phone_number,
                        password:hash
                
                    });
                    user
                    .save()
                    .then(result=>{
                        console.log('User saved');
                        res.redirect('/login')
                    })
                    .catch(e=>{
                        res.status(500).json({
                            error:e
                        })
                        console.log(e.message);
                    })
                }
            })
        }
    })
    
  
}
function make_payment(req,res,next){

}


function registration_page(req,res,next) {
    res.render('register')
    next()
    
}
function login_page(req,res,next) {
    res.render('login')
    
}

function pay_page(req,res,next) {
    res.render('make_payment')
    
}
async function sign_up(req,res,next){
    const {name,email,phone_number,password}=req.body
    try {
        const user = await User.create({name,email,phone_number,password})
        const token=create_jwt(user.email)
        console.log(token);
        res.cookie('jwt', token, {httpOnly:true,maxAge:6000000})
        res.status(201).redirect('/user/pay_page')
        next()
    } catch (error) {
        console.log(error);
        next()
    }
}

async function login_2(req, res,next) {
    let {email, password}=req.body
    try {
        let user=await User.findOne({email})
        res.status(200).json({user:user._id})
    } catch (error) {
        console.log(error);
    }
}
module.exports={login_user,register_user,registration_page,make_payment,login_page,pay_page,sign_up,login_2}