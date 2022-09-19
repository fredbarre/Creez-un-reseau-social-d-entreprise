import express from "express";
import auth from "../middlewares/auth";

let router = express.Router();

import * as post_controller from "../controllers/postController";

router.post("/api/posts", auth, post_controller.getPosts);

router.post("/api/post/:id", auth, post_controller.getPost);

router.post("/api/newPost", auth, post_controller.newPost);

router.post("/api/newComment/:id", auth, post_controller.newComment);

router.delete("/api/post/:id", auth, post_controller.deletePost);

router.put("/api/post/:id", auth, post_controller.updatePost);

router.post("/api/post/like/:id", auth, post_controller.setLike);

export default router;
