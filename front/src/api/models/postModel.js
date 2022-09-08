import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  post: { type: String, required: true },
  link: { type: String },
});

let postModel = mongoose.model("post", postSchema);
export default postModel;
