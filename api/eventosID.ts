import { Request, Response } from "express";
import Event from "../models/Event"; // Path to your Event model

export default async function eventosIDHandler(req: Request, res: Response) {
  const { id } = req.params; // Extract the 'id' from the URL
  const updatedData = req.body;

  console.log(`Received id in request.params: ${id}`);

  // Log the updated data being sent
  console.log("Updated Data:", updatedData);

  try {
    const event = await Event.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
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
