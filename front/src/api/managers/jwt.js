import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../managers/env";
//console.log("secret=" + process.env.REACT_APP_JWT_SECRET);

if (!JWT_SECRET) throw new Error("REACT_APP_JWT_SECRET must be set in .env");
if (!JWT_EXPIRE) throw new Error("REACT_APP_JWT_EXPIRE must be set in .env");

const verify = (token) => jwt.verify(token, JWT_SECRET);

const sign = (data) => jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });

export default { verify, sign };
