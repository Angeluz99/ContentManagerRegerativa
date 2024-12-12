import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import eventosHandler from "../api/eventos";
import eventosIDHandler from "../api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://angelgldiaz:Aveynada199@cluster0.cnr5stl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual connection string

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // No options needed in modern Mongoose
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Call the MongoDB connection function
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware for handling JSON requests

// Root route to check connectivity
app.get("/", (req, res) => {
  res.status(200).send("Welcome! Visit /api/eventos to view the events.");
});

// API routes
app.get("/api/eventos", eventosHandler); // GET all events
app.put("/api/eventos/:id", eventosIDHandler); // PUT to update an event by ID

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
