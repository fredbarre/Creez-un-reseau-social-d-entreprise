import mongoose from "mongoose";
import env from "../managers/env";
console.log("dblink=" + process.env.REACT_APP_DBLINK);
if (!env.DBLINK) throw new Error("REACT_APP_DBLINK must be set in .env");
const DBLINK = env.DBLINK;

const statusDB = mongoose.connect(DBLINK, function (err) {
  if (err) {
    throw err;
  }
});

export default statusDB;
