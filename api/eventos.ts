import { Request, Response } from "express";
import mongoose from "mongoose";
import Event from "../models/Event"; // Corrected relative path to the Event model

// Define the API handler for fetching events
export default async function eventosHandler(req: Request, res: Response) {
  try {
    // Fetch all events from MongoDB
    const events = await Event.find({});
    res.json(events); // Respond with the events data
  } catch (error) {
    console.error("Error fetching events from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch events." });
  }
}
