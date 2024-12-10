import express from "express";
import cors from "cors"; // Import CORS
import eventosHandler from "../api/eventos";
import eventosIDHandler from "../api/eventosID";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware for handling JSON requests

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Define routes
app.get("/api/eventos", eventosHandler);
app.put("/api/eventos/:id", eventosIDHandler);

export default app;
