import express from "express";
import cors from "cors"; // Import CORS
import eventosHandler from "../api/eventos";
import eventosIDHandler from "../api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins

app.use(express.json()); // Middleware for handling JSON requests

// Root route to check connectivity
app.get("/", (req, res) => {
  res.status(200).send("Welcome! Visit /api/eventos to view the events.");
});

// API routes
app.get("/api/eventos", eventosHandler);
app.put("/api/eventos/:id", eventosIDHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
