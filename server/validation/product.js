import { body, check } from "express-validator";

export const productValidator = [
  //send message if its is empty
  check("name")
    .trim()
    .notEmpty()
    .withMessage("name is missing")
    .isLength({ min: 3 })
    .withMessage("name must have 3 character")
    .isLength({ max: 31 })
    .withMessage("name must be max 31 character"),
  check("price")
    .trim()
    .notEmpty()
    .withMessage("price is missing")
    .isLength({ min: 1 })
    .withMessage("price must have 1 character")
    .isLength({ max: 5 })
    .withMessage("price must be max 5 character"),
  check("description")
    .trim()
    .notEmpty()
    .withMessage("description is missing")
    .isLength({ min: 1 })
    .withMessage("des must have 3 character")
    .isLength({ max: 441 })
    .withMessage("des must be max 441 character"),
  check("quantity")
    .trim()
    .notEmpty()
    .withMessage("quantity is missing")
    .isLength({ min: 1 })
    .withMessage("quantity must have 1 character")
    .isLength({ max: 31 })
    .withMessage("quantity must be max 31 character"),
  check("category")
    .trim()
    .notEmpty()
    .withMessage("category is missing")
    .isLength({ min: 1 })
    .withMessage("category must have 1 character")
    .isLength({ max: 31 })
    .withMessage("category must be max 31 character"),
];
