import dotenv from "dotenv";

/*
module.exports = {
  ...dotenv.config({ path: ".env" }).parsed,
};*/
/*
let env = {
  ...dotenv.config({ path: ".env" }).parsed,
};*/
let env = {
  PORT: process.env.REACT_APP_PORT,
  DBLINK: process.env.REACT_APP_DBLINK,
  TOKENSECRET: process.env.REACT_APP_TOKENSECRET,
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET,
  JWT_EXPIRE: process.env.REACT_APP_JWT_EXPIRE,
};

console.log(
  "env port " + env.PORT + " process port " + process.env.REACT_APP_PORT
);
export default env;
