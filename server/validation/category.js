import { check } from "express-validator"




export const categoryValidator = [
  //send message if name is empty
  check('name')
  .trim()
  .notEmpty()
  .withMessage('name is missing')
  .isLength({min:3})
  .withMessage('name must have 3 character')
  .isLength({max:31})
  .withMessage('name must be max 31 character'),
  
]



  
