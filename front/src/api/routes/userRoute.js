import express from "express";
import auth from "../middlewares/auth";
let router = express.Router();

import user_controller from "../controllers/userController";

router.post("/api/auth/signup", user_controller.signup);

router.post("/api/auth/login", user_controller.login);

router.post("/api/account/settings", auth, user_controller.setSettings);

router.post("/api/account/connected", user_controller.isConnected);

export default router;
