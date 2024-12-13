import { Request, Response } from "express";
import Event from "../models/Event"; // Path to your Event model

export default async function eventosIDHandler(req: Request, res: Response) {
  const { id } = req.params; // Extract the 'id' from the URL
  const updatedData = req.body;

  try {
    // Find the event by 'id' and update it
    const event = await Event.findOneAndUpdate({ id }, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Enforce schema validation
    });

    if (!event) {
      return res
        .status(404)
        .json({ message: `Event with id ${id} not found.` });
    }

    res.json({ message: "Event updated successfully.", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update the event." });
  }
}
