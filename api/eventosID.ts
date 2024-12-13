import { Request, Response } from "express";
import Event from "../models/Event"; // Your Mongoose model

export default async function eventosIDHandler(req: Request, res: Response) {
  const eventId = req.params.id; // Extract event ID from the route params

  try {
    // Update the specific event by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      req.body, // The update data from the request body
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      console.error(`Event with ID ${eventId} not found.`);
      return res.status(404).json({ error: "Event not found." });
    }

    console.log("Updated event:", updatedEvent); // Debug updated event
    res
      .status(200)
      .json({ message: "Event updated successfully.", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update the event." });
  }
}
