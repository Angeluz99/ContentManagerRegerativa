"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500", // Make sure this is the correct origin
}));
app.use(express_1.default.json());
// Path to the JSON file
const filePath = path_1.default.join(__dirname, "data.json");
// API to get JSON data
app.get("/api/eventos", (req, res) => {
    fs_1.default.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({ error: "Failed to read the data file." });
        }
        try {
            const events = JSON.parse(data);
            res.json(events);
        }
        catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
            res.status(500).json({ error: "Invalid JSON format." });
        }
    });
});
// API to update a specific event by ID
app.post("/api/eventos/:id", (req, res) => {
    const eventId = req.params.id;
    fs_1.default.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({ error: "Failed to read the data file." });
        }
        try {
            const events = JSON.parse(data);
            // Find the event to update
            const eventIndex = events.findIndex((event) => event.id === eventId);
            if (eventIndex === -1) {
                return res.status(404).json({ error: "Event not found." });
            }
            // Update the specific event
            events[eventIndex] = { ...events[eventIndex], ...req.body };
            // Save updated data
            fs_1.default.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
            res.status(200).json({ message: "Event updated successfully." });
        }
        catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
            res.status(500).json({ error: "Invalid JSON format." });
        }
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
