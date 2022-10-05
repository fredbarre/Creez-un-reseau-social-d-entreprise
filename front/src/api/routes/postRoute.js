import express from "express";
import auth, { authPost } from "../middlewares/auth";

let router = express.Router();

import * as post_controller from "../controllers/postController";
import multer from "../middlewares/multer-config";

router.get("/api/post", auth, post_controller.getPosts);
router.post("/api/post", auth, post_controller.newPost);
router.get("/api/post/:id", auth, post_controller.getPost);
router.put("/api/post/:id", auth, authPost(true), post_controller.updatePost);
router.delete(
  "/api/post/:id",
  auth,
  authPost(true),
  post_controller.deletePost
);
router.post("/api/post/:id/comment", auth, post_controller.newComment);
router.post("/api/post/:id/like", auth, post_controller.setLike);
router.delete(
  "/api/post/comment/:cid",
  auth,
  authPost(true),
  post_controller.deleteComment
);
router.put(
  "/api/post/comment/:cid",
  auth,
  authPost(true),
  post_controller.updateComment
);
router.post(
  "/api/post/:id/image",
  auth,
  multer,
  post_controller.uploadPostImage
);

export default router;
