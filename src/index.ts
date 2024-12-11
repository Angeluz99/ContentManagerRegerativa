import express from "express";
import cors from "cors"; // Import CORS
import eventosHandler from "../api/eventos";
import eventosIDHandler from "../api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "https://regeneratecelulasdistribucion.com",
  })
);
app.use(express.json()); // Middleware for handling JSON requests

// Root route to check connectivity
app.get("/", (req, res) => {
  res.send("Welcome to the Content Manager API for Medicina Regenerativa!");
});

// API routes
app.get("/api/eventos", eventosHandler);
app.put("/api/eventos/:id", eventosIDHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
