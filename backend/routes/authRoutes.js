// Import express
import express from "express";

// Import functions controllers
import { register, login, home, logoutAccount } from "../controllers/authControllers.js";

// Import Verify token
import verifyToken from "../middlewares/verifyToken.js";

// Create mini-app
const router = express.Router();

// Register router
router.post("/register", register);

// Login router
router.post("/login", login);

// Log out account
router.delete("/logoutAccount", verifyToken, logoutAccount);

// Protected router
router.get("/home", verifyToken, home);

export default router;
