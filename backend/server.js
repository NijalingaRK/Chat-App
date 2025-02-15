import path from "path";
import express from "express";
import dotenv from "dotenv";


import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";



const PORT = process.env.PORT || 5000;

const __dirname= path.resolve();

// Load environment variables
dotenv.config();



// Middleware to parse JSON bodies
app.use(express.json()); // This line must come before your routes
app.use(cookieParser());

// Authentication routes
app.use("/api/auth", authRoutes);
// Message routes
app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})



// Start the server
server.listen(PORT, () => {
    // Connect to MongoDB
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();  // ✅ Load .env at the very top!

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(express.json());  // ✅ This must be BEFORE routes!
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend build files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server only AFTER MongoDB connects
connectToMongoDB().then(() => {
    server.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ MongoDB connection failed:", err);
});
