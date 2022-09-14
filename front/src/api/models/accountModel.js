//import mongoose from "mongoose";
import { mongoose } from "../managers/mongoDB";
import uniqueValidator from "mongoose-unique-validator";

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

accountSchema.plugin(uniqueValidator);
//console.log("mongoose.models.user: " + mongoose.models.user);
delete mongoose.models.Account;
let accountModel = mongoose.model("Account", accountSchema);
export default accountModel;
