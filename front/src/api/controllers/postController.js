import { checkPreferences } from "joi";
import joischema from "../managers/joivalidator";
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

export async function newPost(req, res) {
  console.log("newPost");
  /*console.log("postobj ", req.body);
  console.log("postobj ", JSON;*/
  /*
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
  return res.status(201).json({ message: "post créé !" });*/
}

export default newPost;
