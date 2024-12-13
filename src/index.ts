import express from "express";
import cors from "cors";
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
