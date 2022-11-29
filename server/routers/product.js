import { Router } from "express";
import formidableMiddleware from 'express-formidable';

import { createProduct, getProducts, getProduct, deleteProduct, getPhoto,updateProduct } from "../controllers/product.js"; 
import { runValidation } from "../validation/index.js";
import { productValidator } from "../validation/product.js";
import { isAdmin, isLoggedIn } from "../validation/user.js"; 
const productRoute = Router(); //app
//create a product
productRoute.post("/products", isLoggedIn,isAdmin , formidableMiddleware(),createProduct)
productRoute.get("/products",getProducts)
productRoute.get("/products/:slug",getProduct)
productRoute.get("/products/photo/:productId",getPhoto)

productRoute.delete("/products/:productId", isLoggedIn,isAdmin,  deleteProduct)
productRoute.put("/products/:productId", isLoggedIn,isAdmin,  formidableMiddleware(),updateProduct)






export default productRoute;
