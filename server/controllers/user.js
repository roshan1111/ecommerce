import { comparePassword, securePassword } from "../config/securePassword.js";
import User from "../models/user.js";
import Jwt from "jsonwebtoken";
import { dev } from "../config/index.js";
import { sendVerificationEmail } from "../utility/email.js";

export const registerUser = async (req, res) => {
  try {
    //hash password getting from registration form
    const password = req.body.password;
    const hashpassword = await securePassword(password);
    // console.log(hashpassword);

    //getting data from registration form
    const { name, email, address, image } = req.body;
    // console.log(name, email, address, hashpassword);

    //checking if user exist or not
    const existingUsers = await User.findOne({ email: email });
    if (existingUsers) {
      return res.status(400).json({
        message: "user already exist with this email",
      });
    }

    // creating token and storing data temporarly iniside token
    const token = Jwt.sign(
      { name, email, address, hashpassword, image },
      String(dev.app.jwt_secret_key),
      {
        //  algorithm: 'RS256',
        expiresIn: "10m",
      }
    );

    //after storing data in token now prepare the email body
    //emailData is send inside utolity emails
    const emailData = {
      email: email,
      subject: "Verification Email ✔", // Subject line
      html: `<p> Welcome ${name} !!! 
    Please click the link to 
    verify <a href = "http://127.0.0.1:3000/auth/activate/${token}"> Verify Here </a> </p>`, // html body
    };
    //sending emailData to sendVerificationEmail inside utility email
    sendVerificationEmail(emailData);

    return res.status(200).json({
      message: `please got to the email: ${email} for acyivating your registration`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const activateAccount = async (req, res) => {
  try {
    //get the token from req body

    const { token } = req.body;
    //if there is no token
    if (!req.body.token) {
      return res.status(404).json({ error: "token not found" });
    }

    //verifying token data and saving data as a decoded
    const decoded = Jwt.verify(
      token,
      dev.app.jwt_secret_key,
      async (err, decoded) => {
        //if token is expired
        if (err) {
          return res
            .status(401)
            .json({ error: "link has expired. Please signup again" });
        }
        //getting data from decoded 
        const { name, email, address, hashpassword, image } = decoded;
        //create new user and save the data from token
        const newUser = new User({
          name,
          email,
          password: hashpassword,
          image,
          address,
        });
        await newUser.save();
      }
    );
    //send message after user is saved and activated on db
    return res.status(200).json({
      message: "account is  activated",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        message: "user does not exist please register",
      });
    }
    const isMatched = await comparePassword(password, existingUser.password);
    if (!isMatched) {
      return res.status(400).send({ message: "email or password didnt match" });
    }

    //if id and password is matched we create a token a save user id in it
    // creating token and storing id temporarly iniside token
    const token = Jwt.sign(
      { _id: existingUser._id },
      String(dev.app.jwt_secret_key),
      {
        //  algorithm: 'RS256',
        expiresIn: "10m",
      }
    );

    return res.status(200).json({
      message: "user is signed in",
      users: {
        name: existingUser.name,
        email: existingUser.email,
        address: existingUser.address,
        image: existingUser.image,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};


export const loadProtected = async(req, res)=>{
    try{
      // console.log(   req.userId)
      return res.status(200).json({
        message: "protected page"
    })
    }
    catch(error){
      return res.status(500).send({
            message: error.message
        })
    }
}
