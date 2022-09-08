import express from "express";
let router = express.Router();

import user_controller from "../controllers/userController";

router.post("/api/auth/signup", user_controller.signup);

router.post("/api/auth/login", user_controller.login);

export default router;
