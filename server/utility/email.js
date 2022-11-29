//"use strict";
import { dev } from "../config/index.js";
import nodemailer from "nodemailer"

//getting emaildata from controller where they call function sendVerificationEmail
export const sendVerificationEmail = async (emailData) => {
    console.log(emailData)
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: dev.app.authEmail, // generated ethereal user
        pass: dev.app.authPassword, // generated ethereal password
      },
    });

    const mailOptions = {
      from: dev.app.authEmail, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html //html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: %s", info.response);
      }
    });
  } catch (error) {
    console.log("problem in sending email:", error);
  }
};
