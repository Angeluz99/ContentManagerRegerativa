import express from "express";
import eventosHandler from "./api/eventos";
import eventosIDHandler from "./api/eventosID"; // Relative path to eventosID.ts

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // This middleware is important for handling JSON requests

// Define routes
app.get("/api/eventos", eventosHandler); // Route for fetching eventos
app.put("/api/eventos/:id", eventosIDHandler); // Route for updating evento by ID

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
