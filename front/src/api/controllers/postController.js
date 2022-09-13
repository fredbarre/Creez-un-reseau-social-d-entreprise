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
