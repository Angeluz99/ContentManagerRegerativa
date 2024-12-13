import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document {
  id: string;
  icon: string;
  title: string;
  fecha: string;
  lugar: string;
  description: string;
  ponente: string;
  imageUrl: string;
}

const EventSchema = new Schema<IEvent>({
  id: { type: String, required: true, unique: true },
  icon: String,
  title: String,
  fecha: String,
  lugar: String,
  description: String,
  ponente: String,
  imageUrl: String,
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
