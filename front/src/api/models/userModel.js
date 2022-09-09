import mongoose from "mongoose";
import mongodb from "../managers/mongoDB";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
//console.log("mongoose.models.user: " + mongoose.models.user);
let userModel = mongoose.model("user", userSchema);
export default userModel;
