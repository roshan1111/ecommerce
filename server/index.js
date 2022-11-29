import express from "express";
//to see request on console
import morgan from "morgan";
//change color on console
import chalk from "chalk";
import { dev } from "./config/index.js";
import connectDB from "./config/db.js";
import userRoute from "./routers/user.js";
import bodyParser from "body-parser";
import categoryRoute from "./routers/category.js";
import productRoute from "./routers/product.js";

const app = express();

const port = dev.app.port;

app.listen(port, async () => {
  console.log(
    chalk.blue(`the serever is running at http://localhost:${port} `)
  );
  await connectDB();
});

app.use(morgan("dev"));

//these aree middleware receiving json data
app.use(bodyParser.json());
//receiving form data body it must be there
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("welcome to the ecommerce  project");
});

//using user route
app.use("/api/users", userRoute);
//using category route
app.use("/api/category", categoryRoute)
//using product route
app.use("/api", productRoute)

//client error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({
    success: false,
    error: err.message,
  });
});

//server error
app.use((err, req, res, next) => {
  res.status(404).send({
    message: "404 not found",
  });
});
