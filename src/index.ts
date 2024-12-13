import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { getEventosHandler, addEventHandler } from "../api/eventos";
import eventosIDHandler from "../api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome! Visit /api/eventos to view the events.");
});

// API routes
app.get("/api/eventos", getEventosHandler); // Fetch all events
app.post("/api/eventos", addEventHandler); // Add a new event
app.put("/api/eventos/:id", eventosIDHandler); // Update an event by ID

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://angelgldiaz:Aveynada199@cluster0.cnr5stl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false; // Track the connection state

async function connectToDatabase() {
  if (!isConnected) {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(MONGO_URI); // No additional options needed
      isConnected = true;
      console.log("Connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}

// Connect to MongoDB before starting the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
