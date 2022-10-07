import joischema from "../managers/joivalidator";
import commentModel from "../models/commentsModel";
import postModel from "../models/postModel";
import fs from "fs";
import { title } from "process";

/**Récupère les la liste des posts dans la base de données */
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
  /* console.log("getPosts");
  console.log(post);*/
  res.status(200).json(post);
}

/**récupère le post avec l'id dans la variable req.params.id*/
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

  //console.log(post);
  return res.status(200).json(post);
}

/**supprime le post avec l'id dans la variable req.params.id */
export async function deletePost(req, res) {
  let postId = req.params.id;
  let post = await postModel.findOne({ _id: postId });
  let comments = post.comments;
  //console.log("delete post comments: " + post);
  comments.forEach(async function (element) {
    await commentModel.deleteMany({ _id: element });
  });

  try {
    await fs.promises.unlink(post.link);
  } catch (error) {
    console.log("error" + error);
  }

  await postModel.deleteOne({ _id: postId });

  return res.status(200).json({ message: "post supprimé" });
}
/**ajoute un commentaire au post avec l'id dans la variable req.params.id avec comme contenu de commentaire req.body.comment */
export async function newComment(req, res) {
  let postId = req.params.id;
  let comment = req.body.comment;

  let { error, value } = joischema.validate({
    comment: comment,
  });

  if (error != undefined) {
    //throw new Error("error");
    return res
      .status(400)
      .json({ message: "champ pour le commentaire non valide" });
  }

  const commentM = new commentModel({
    user: req.auth.userId,
    comment: comment,
  });
  await postModel.updateOne(
    { _id: postId },
    {
      $push: { comments: commentM._id },
    }
  );

  commentM.save();

  return res.status(201).json(commentM);
}
/**crée un nouveau post avec les valeurs contenu dans req.body (title post) */
export async function newPost(req, res) {
  //console.log("newPost");
  /*console.log("postobj ", req.body);
  console.log("postobj ", JSON;*/

  const postObject = req.body;

  console.log("title" + postObject.title);
  let { error, value } = joischema.validate({
    title: postObject.title,
    post: postObject.post,
  });
  if (error != undefined) throw new Error("error");

  //console.log("postObject=", postObject);
  delete postObject._id;
  delete postObject.accountId;
  //delete postObject.userId;
  //console.log("postObject=", postObject);
  //console.log("userId" + req.body.userId);
  const post = new postModel({
    //...postObject,
    user: postObject.userId,
    title: postObject.title,
    post: postObject.post,
    link: postObject.link,

    comments: [],
    likes: 0,
    userLiked: [],
  });
  //console.log("post=", post);
  post.save();
  return res.status(201).json(post);
}

/**met a jour le post avec l'id contenu dans req.params.id avec les valeurs req.body.title req.body.post*/
export async function updatePost(req, res) {
  let postId = req.params.id;
  let { error, value } = joischema.validate({
    title: req.body.title,
    post: req.body.post,
  });

  if (error != undefined) {
    //throw new Error("error");
    return res.status(400).json({ message: "champs pour le post non valide" });
  }
  await postModel.updateOne(
    { _id: postId },
    {
      title: req.body.title,
      post: req.body.post,
    }
  );
  return res.status(200).json({ title: req.body.title, post: req.body.post });
}

/**met a jour le commentaire avec l'id contenu dans req.params.cid avec le commentaire contenu dans req.body.comment */
export async function updateComment(req, res) {
  let commentId = req.params.cid;
  let comment = req.body.comment;
  let { error, value } = joischema.validate({
    comment: req.body.comment,
  });

  if (error != undefined) {
    //throw new Error("error");
    return res.status(400).json({ message: "champs  non valide" });
  }
  await commentModel.updateOne(
    { _id: commentId },
    {
      comment: comment,
    }
  );
  return res.status(200).json({ comment });
}

/**ajoute ou retire un like avec l'id contenu dans req.params.id */
export async function setLike(req, res) {
  let postId = req.params.id;
  let userId = req.auth.userId;
  //let setLikeTo = req.body.setLikeTo;

  let post = await postModel.findOne({ _id: postId });

  let liked = post.userLiked.indexOf(userId) != -1;
  /*
  console.log("setLike");
  console.log("Liked", liked);
*/
  if (liked) {
    await postModel.updateOne(
      { _id: postId },
      {
        likes: post.likes - 1,
        $pull: { userLiked: userId },
      }
    );
  } else {
    await postModel.updateOne(
      { _id: postId },
      {
        likes: post.likes + 1,
        $push: { userLiked: userId },
      }
    );
  }
  return res.status(200).json({ message: "Like mis a jour" });
}

/**Supprime le commentaire avec l'id contenu dans req.params.cid */
export async function deleteComment(req, res) {
  //let commentId = req.body.commentId;
  let commentId = req.params.cid;
  //let userId = req.auth.userId;

  let result = await commentModel.updateOne(
    {
      _id: commentId,
    },
    {
      comment: "--- Commentaire supprimé---",
    }
  );

  if (result.modifiedCount != 1)
    return res.status(400).json({ message: "Commentaire non supprimé" });
  return res.status(200).json({ message: "Commentaire supprimé" });
}

/**upload l'image du post avec l'id dans req.params.id */
export async function uploadPostImage(req, res) {
  //let userId = req.auth.userId;
  let postId = req.params.id;
  let post = await postModel.findOne({ _id: postId });
  //console.log("upload postuser", postId);
  if (post.user != req.auth.userId || req.auth.role.indexOf("admin") != -1) {
    return res.status(400).json({ message: "autorisation non accordée" });
  }

  try {
    await fs.promises.unlink(post.link);
  } catch (error) {}

  await postModel.updateOne(
    { _id: postId },
    {
      link: req.file.path,
    }
  );

  return res.status(200).json(req.file);
}
//export default newPost;
