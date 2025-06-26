// Import express
import express from "express";

// Import functions controllers
import { register, login, home } from "../controllers/authControllers.js";

// Import Verify token
import verifyToken from "../middlewares/verifyToken.js";

// Create mini-app
const router = express.Router();

// Register router
router.post("/register", register);

// Login router
router.post("/login", login);

// Protected router
router.get("/home", verifyToken, home);

export default router;
