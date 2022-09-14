import express from "express";
let router = express.Router();

import * as post_controller from "../controllers/postController";

router.get("/api/posts", post_controller.getPosts);
/*
router.get("/api/post/:id", post_controller.getPost);
*/
router.post("/api/newPost", post_controller.newPost);
/*
router.delete("/api/post/:id", post_controller.deletePost);
*/

export default router;
