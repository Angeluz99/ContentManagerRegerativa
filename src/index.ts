import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Make sure this is the correct origin
  })
);
app.use(express.json());

// Path to the JSON file
const filePath = path.join(__dirname, "data.json");

// API to get JSON data
app.get("/api/eventos", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Failed to read the data file." });
    }

    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
});

// API to update a specific event by ID
app.post("/api/eventos/:id", (req: Request, res: Response) => {
  const eventId = req.params.id;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Failed to read the data file." });
    }

    try {
      const events = JSON.parse(data);

      // Find the event to update
      const eventIndex = events.findIndex((event: any) => event.id === eventId);
      if (eventIndex === -1) {
        return res.status(404).json({ error: "Event not found." });
      }

      // Update the specific event
      events[eventIndex] = { ...events[eventIndex], ...req.body };

      // Save updated data
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
      res.status(200).json({ message: "Event updated successfully." });
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
