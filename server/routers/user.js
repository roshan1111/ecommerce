import { Router } from "express";
import { activateAccount, loadProtected, loginUser, registerUser } from "../controllers/user.js";
import { runValidation } from "../validation/index.js";
import { isAdmin, isLoggedIn, loginUserValidator, registerUserValidator } from "../validation/user.js";

const userRoute = Router(); //app

//register route (checking register validator and running validation and then go to regosteruser controller)
userRoute.post("/register", registerUserValidator, runValidation, registerUser);

userRoute.post("/account-activation", activateAccount);
userRoute.post("/login", loginUserValidator,runValidation, loginUser);
userRoute.get("/protected",isLoggedIn, isAdmin, loadProtected);



export default userRoute;
 