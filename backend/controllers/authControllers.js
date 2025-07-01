// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import Bcrypt
import bcrypt from "bcrypt";

// Import JWT
import jwt from "jsonwebtoken";

// Import DB
import { db } from "../lib/db.js";

// Import verifyToken middleware
// import verifyToken from "../middlewares/verifyToken.js";

// Register controller
export const register = async (req, res) => {

    // Body response
    console.log("BODY:", req.body);

    // Req body
    const { username, email, password } = req.body; // Destructure the request body to get name, email, and password

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({
                message: "User already existed."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            username,
            email,
            hashedPassword,
        ]);

        res.status(201).json({
            message: "User successfully registered",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });
        console.log("Generated token: ", token);
        
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Logout account
export const logoutAccount = async (req, res) => {
    try {
        const userId = req.userId;

        const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            message: "Account deleted successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting account."
        });
    }
}

// Protected route controller
export const home = async (req, res) => {
    
    try {
        const [rows] = await db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        };

        res.status(200).json({
            user: rows[0]
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
