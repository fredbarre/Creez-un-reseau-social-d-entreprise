import express from "express";
let router = express.Router();

import * as post_controller from "../controllers/postController";

router.get("/api/posts", post_controller.getPosts);

router.get("/api/post/:id", post_controller.getPost);

router.post("/api/newPost", post_controller.newPost);

router.post("/api/newComment/:id", post_controller.newComment);

router.delete("/api/post/:id", post_controller.deletePost);

router.put("/api/post/:id", post_controller.updatePost);

router.post("/api/post/like/:id", post_controller.setLike);

export default router;
