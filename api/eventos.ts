import { Request, Response } from "express";
import Event from "../models/Event"; // Ensure the path to the Event model is correct

// Fetch all events
export async function getEventosHandler(req: Request, res: Response) {
  try {
    // Retrieve all events from MongoDB
    const events = await Event.find({});
    res.json(events); // Send the events as the response
  } catch (error) {
    console.error("Error fetching events from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
}

// Add a new event
export async function addEventHandler(req: Request, res: Response) {
  try {
    // Create a new Event document
    const newEvent = new Event(req.body);

    // Save the document to MongoDB
    const savedEvent = await newEvent.save();

    res
      .status(201)
      .json({ message: "Event created successfully.", savedEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create the event." });
  }
}
