import express from "express";
import morgan from "morgan";

import cors from "./middlewares/cors";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
//import error from "./middlewares/error";
export const handler = express();
import dotenv from "dotenv";
dotenv.config();
import env from "./managers/env";
if (!env.PORT) console.log("PORT should be set in .env");
const { PORT = 3000 } = env;

handler.use(express.json());
handler.use(express.urlencoded({ extended: true }));
handler.use(morgan("dev", { immediate: false }));
handler.use(morgan("dev", { immediate: true }));
handler.use("/api", (req, res) => res.json(req.url));
handler.use(cors);
handler.use(express.static("images"));
handler.use("/", userRoute);
handler.use("/", postRoute);

//handler.use(error);
