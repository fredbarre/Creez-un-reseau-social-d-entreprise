import mongoose from "mongoose";
import env from "../managers/env";
//console.log("dblink=" + process.env.REACT_APP_DBLINK);
if (!env.MONGO_DBLINK) throw new Error("MONGO_DBLINK must be set in .env");
const DBLINK = env.MONGO_DBLINK;

const statusDB = mongoose.connect(DBLINK, function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connecté a la base de donnée");
  }
});

export default statusDB;
export { mongoose };
