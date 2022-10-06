import mongoose from "mongoose";
import mongodb from "../managers/mongoDB";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    /*required: true,*/
    ref: "Account",
    select: false,
  },
  name: { type: String },
  avatarLink: { type: String, default: "" },
});

userSchema.plugin(uniqueValidator);
//console.log("mongoose.models.user: " + mongoose.models.user);
delete mongoose.models.User;
let userModel = mongoose.model("User", userSchema);
export default userModel;
