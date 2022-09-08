import dotenv from "dotenv";

/*
module.exports = {
  ...dotenv.config({ path: ".env" }).parsed,
};*/

let env = {
  ...dotenv.config({ path: "../.env" }).parsed,
};
console.log("env " + env + "port " + process.env.PORT);
export default env;
