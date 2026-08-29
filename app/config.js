import dotenv from "dotenv";

dotenv.config();

const server = {
  port: process.env.PORT,
  url: process.env.DATABASE,
};

export default server;
