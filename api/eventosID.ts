import { Request, Response } from "express";
import fs from "fs";
import path from "path";

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

      // Ensure the id is a string for comparison
      const eventIndex = events.findIndex((event: any) => event.id === eventId);

      if (eventIndex === -1) {
        console.error(`Event with ID ${eventId} not found.`);
        return res.status(404).json({ error: "Event not found." });
      }

      // Debug incoming body
      console.log("Incoming body:", req.body);

      // Update the specific event
      events[eventIndex] = { ...events[eventIndex], ...req.body };

      // Debug updated event
      console.log("Updated event:", events[eventIndex]);

      // Save the updated data
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
      res.status(200).json({ message: "Event updated successfully." });
    } catch (parseError) {
      console.error("Error parsing JSON data or updating event:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
}
