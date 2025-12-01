import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test MySQL connection
try {
    const connection = await pool.getConnection();
    console.log("MySQL Connected Successfully!");
    connection.release();
} catch (error) {
    console.error("MySQL Connection Failed:", error);
}

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
// Test route
app.get("/", (req, res) => {
    res.send("Mapped Miles API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
