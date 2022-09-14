import { checkPreferences } from "joi";
import joischema from "../managers/joivalidator";
import commentModel from "../models/commentsModel";
import postModel from "../models/postModel";

export async function getPosts(req, res) {
  let post = await postModel
    .find()
    .populate({
      path: "user",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  console.log(post);
  res.status(200).json(post);
}
/*
export async function getPosts(req, res) {
  let post = await postModel.find();

  console.log(post);
  res.status(200).json(post);
}

export async function getComments(req, res) {
  let id = req.body._id;
  let comments = await commentModel.find({});
}
*/
export async function newComment(req, res) {
  let postId = req.body.postId;
  //let postId = req.params.id;
  let comment = req.body.comment;

  let { error, value } = joischema.validate({
    comment: comment,
  });

  if (error != undefined) throw new Error("error");

  const commentM = new commentModel({
    user: req.body.user,
    comment: comment,
  });
  await postModel.updateOne(
    { _id: postId },
    {
      $push: { comments: commentM._id },
    }
  );

  commentM.save();

  return res.status(201).json({ message: "commentaire créé !" });
}

export async function newPost(req, res) {
  console.log("newPost");
  /*console.log("postobj ", req.body);
  console.log("postobj ", JSON;*/

  const postObject = req.body;
  console.log("title" + postObject.title);
  let { error, value } = joischema.validate({
    title: postObject.title,
    post: postObject.post,
  });
  if (error != undefined) throw new Error("error");

  delete postObject._id;

  const post = new postModel({
    ...postObject,
    Comment: [],
  });
  post.save();
  return res.status(201).json({ message: "post créé !" });
}

export default newPost;
