import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Define the API handler for fetching events
export default async function eventosHandler(req: Request, res: Response) {
  // Assuming you have a data file
  const filePath = path.join(__dirname, "data.json");

  // Read the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Failed to read the data file." });
    }

    try {
      const events = JSON.parse(data);
      res.json(events); // Respond with the events data
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
}
