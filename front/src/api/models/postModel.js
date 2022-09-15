import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  post: { type: String, required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  link: { type: String },
  date: { type: Date, default: Date.now },
  likes: { type: Number },
  userLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
delete mongoose.models.Post;
let postModel = mongoose.model("Post", postSchema);
export default postModel;
