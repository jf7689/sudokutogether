import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const env = {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  dbUrl: process.env.DB_URL,
  dbKey: process.env.DB_KEY,
};

export default env;
