import express from "express";
import auth from "../middlewares/auth";
let router = express.Router();

import user_controller from "../controllers/userController";
import multer from "../middlewares/multer-config";

router.post("/api/auth/signup", user_controller.signup);

router.post("/api/auth/login", user_controller.login);

router.post("/api/account/settings", auth, user_controller.setSettings);

router.post("/api/user/avatar", auth, multer, user_controller.uploadAvatar);

export default router;
