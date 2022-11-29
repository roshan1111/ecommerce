import { check } from "express-validator"
import Jwt from "jsonwebtoken";
import { dev } from "../config/index.js";
import User from "../models/user.js";



export const registerUserValidator = [
  //send message if name is empty
  check('name')
  .trim()
  .notEmpty()
  .withMessage('name is missing')
  .isLength({min:3})
  .withMessage('name must have 3 character')
  .isLength({max:31})
  .withMessage('name must be max 31 character'),
  check('email')
  .trim()
  .notEmpty()
  .withMessage('email is missing')
  .isEmail()
  .withMessage('not a valid email')
  .normalizeEmail(),
  check('password')
  .trim()
  .notEmpty()
  .withMessage('password is missing')
  .isLength({min:4})
  .withMessage('password must have 3 character')
  .isLength({max:15})
  .withMessage('name must be max 15 character'),
]

export const loginUserValidator = [
    //send message if its is empty
    check('email')
    .trim()
    .notEmpty()
    .withMessage('email is missing')
    .isEmail()
    .withMessage('not a valid email')
    .normalizeEmail(),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('password is missing')
    .isLength({min:4})
    .withMessage('password must have 3 character')
    .isLength({max:15})
    .withMessage('name must be max 15 character'),
  ]


  
//protected routed (if user is loged in allow to go next)
export const isLoggedIn = (req,res,next)=>{
  try {
    //check if req header token is avilable or not
    if(!req.headers.authorization){
      return res.status(404).json({
        error: "no token found in request header"
    })
    }
    const token = req.headers.authorization
    const decode = Jwt.verify(token,dev.app.jwt_secret_key)
    // console.log(decode)
   req.userId = decode._id;

    next();
    
  } catch (error) {
    return res.status(401).send({
      message: error.message
  })
  }
}

//check if user is admin is not

export const isAdmin = async(req,res,next)=>{
  try {
    //match database id and req.userId that we get from token
    const existingUser = await User.findById({ _id:req.userId });
    if(!existingUser){
      return res.status(404).json({
        error: "no user is found please login"
    })
    }
    //if user is not admin which is not 1 
    if(existingUser.role !== 1){
      return res.status(401).json({
        error: "you dont have excess. not an admin"
    })

    }


    next()
    
  } catch (error) {
    return res.status(401).send({
      message: error.message
  })
  }

}