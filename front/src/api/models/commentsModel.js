import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  post: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
delete mongoose.models.Comment;
let commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
