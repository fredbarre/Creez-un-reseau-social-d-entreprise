import express from "express";
import morgan from "morgan";

export const handler = express();

handler.use(morgan("dev", { immediate: false }));
handler.use(morgan("dev", { immediate: true }));
handler.use("/api", (req, res) => res.json(req.url));
