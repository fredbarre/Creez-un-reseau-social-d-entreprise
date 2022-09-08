import jwt from "jsonwebtoken";
//import { JWT_SECRET, JWT_EXPIRE } from "../managers/env";

/*
if (!JWT_SECRET) throw new Error("JWT_SECRET must be set in .env");
if (!JWT_EXPIRE) throw new Error("JWT_EXPIRE must be set in .env");*/
let JWT_SECRET = "123";
let JWT_EXPIRE = "24h";

const verify = (token) => jwt.verify(token, JWT_SECRET);

const sign = (data) => jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });

export default { verify, sign };
