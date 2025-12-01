import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Mapped Miles API is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
