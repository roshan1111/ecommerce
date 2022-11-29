import * as dotenv from "dotenv";
dotenv.config();

export const dev = {
  app: {
    port: Number(process.env.SERVER_PORT) || 3001,
    jwt_secret_key: process.env.JWT_SECRET_STRING || "asdadfrdfgbds",
    authEmail: process.env.AUTH_EMAIL,
    authPassword: process.env.AUTH_PASSWORD,
  },
  db: {
    //url for bd we are getting from .env
    url: process.env.DB_URL || "",
  },
};
