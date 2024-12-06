import express from "express";
import eventosHandler from "./api/eventos";
import eventosIDHandler from "./api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // This middleware is important for handling JSON requests

// Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running on Vercel!");
});

// Define routes
app.get("/api/eventos", eventosHandler); // Route for fetching events
app.put("/api/eventos/:id", eventosIDHandler); // Route for updating event by ID

// Vercel expects the app to be exported as a handler for serverless functions
export default app;
