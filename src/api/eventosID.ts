import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Define the API handler for updating an event
export default async function eventosIDHandler(req: Request, res: Response) {
  const eventId = req.params.id; // Use params for ID in Express
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Failed to read the data file." });
    }

    try {
      const events = JSON.parse(data);
      const eventIndex = events.findIndex((event: any) => event.id === eventId);

      if (eventIndex === -1) {
        return res.status(404).json({ error: "Event not found." });
      }

      // Update the specific event
      events[eventIndex] = { ...events[eventIndex], ...req.body };

      // Save the updated data
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
      res.status(200).json({ message: "Event updated successfully." });
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
}
