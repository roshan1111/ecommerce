import { validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

     let errorList = errors.array().map((error)=>error.msg)
      return res.status(400).json({
        errors:errorList
      })
    }
    //if no error move to next i.e registerUser on user route
     next()
  };