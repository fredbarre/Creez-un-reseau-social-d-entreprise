import express from "express";
import morgan from "morgan";

import cors from "./middlewares/cors";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
//import error from "./middlewares/error";
export const handler = express();

handler.use(express.json());
handler.use(express.urlencoded({ extended: true }));

import dotenv from "dotenv";
dotenv.config();
import env from "./managers/env";
if (!env.SERVER_PORT) console.log("SERVER_PORT should be set in .env");
const { SERVER_PORT = 3000 } = env;

handler.use(morgan("dev", { immediate: false }));
handler.use(morgan("dev", { immediate: true }));

handler.use(cors);
handler.use(express.static("images"));
handler.use("/", userRoute);
handler.use("/", postRoute);
handler.use("/api", (req, res) => res.json(req.url));

//handler.use(error);
