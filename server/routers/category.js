import { Router } from "express";
import { runValidation } from "../validation/index.js";
import { isAdmin, isLoggedIn } from "../validation/user.js";
import { categoryValidator } from "../validation/category.js";
import {
  createCategory,
  delateCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.js";

const categoryRoute = Router(); //app

//token must be passed on header to pass isloggedIn middleware
categoryRoute.post(
  "/categories",
  categoryValidator,
  runValidation,
  isLoggedIn,
  isAdmin,
  createCategory
);

//update category
categoryRoute.put(
  "/categories/:categoryId",
  categoryValidator,
  runValidation,
  isLoggedIn,
  isAdmin,
  updateCategory
);
//delete category
categoryRoute.delete(
  "/categories/:categoryId",
  
  isLoggedIn,
  isAdmin,
  delateCategory
);
//get all categories
categoryRoute.get(
  "/categories",
  categoryValidator,
  getCategories
);
//get individual category
categoryRoute.get(
  "/categories/:slug",
  categoryValidator,
  getCategory
);


export default categoryRoute;
