import { checkPreferences } from "joi";
import joischema from "../managers/joivalidator";
import commentModel from "../models/commentsModel";
import postModel from "../models/postModel";
//import fsPromises from ("fs").promises;

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

export async function getPost(req, res) {
  let post = await postModel
    .findOne({ _id: req.params.id })
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
  return res.status(200).json(post);
}

export async function deletePost(req, res) {
  //a vérifier l'utilisateur
  let postId = req.params.id;
  let post = await postModel.findOne({ _id: postId });
  let comments = post.comments;
  console.log("delete post comments: " + post);
  comments.forEach(async function (element) {
    await commentModel.deleteMany({ _id: element });
  });

  await postModel.deleteOne({ _id: postId });

  return res.status(200).json({ message: "post supprimé" });
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
    likes: 0,
    userLiked: [],
  });
  post.save();
  return res.status(201).json({ message: "post créé !" });
}

export async function updatePost(req, res) {
  let postId = req.params.id;
  await postModel.updateOne(
    { _id: postId },
    {
      title: req.body.title,
      post: req.body.post,
    }
  );
  return res.status(200).json({ message: "post mis a jour" });
}

export async function setLike(req, res) {
  let postId = req.params.id;
  let userId = req.body.userId;
  let setLikeTo = req.body.setLikeTo;

  let post = await postModel.findOne({ _id: postId });

  let liked = post.userLiked.indexOf(userId) != -1;

  if (liked)
    await postModel.updateOne(
      { _id: postId },
      {
        likes: post.likes - 1,
        $pull: { userLiked: userId },
      }
    );

  if (setLikeTo == 1)
    await postModel.updateOne(
      { _id: postId },
      {
        likes: post.likes + 1,
        $push: { userLiked: userId },
      }
    );
  return res.status(200).json({ message: "Like mis a jour" });
}
//export default newPost;
