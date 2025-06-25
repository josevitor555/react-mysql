
// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import express
import express from "express";

// Import db
import { db } from "./db.js";

// Create express app
const app = express();
app.use(express.json());

// Rout Text for Connect to MySql
app.get("/connect-mysql", async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");

        if (rows.length === 0) {
            console.log("No users found.");
        } else {
            console.log("Users found: ");
            console.table(rows);
        }

        res.json(rows);
    } catch (error) {
        console.log("Error to connect with mysql.", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Define port
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => console.log(`Server is running on ${port} port!`));
