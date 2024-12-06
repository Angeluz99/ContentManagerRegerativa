"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventosIDHandler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the API handler for updating an event
function eventosIDHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = req.params.id; // Use params for ID in Express
        const filePath = path_1.default.join(__dirname, "data.json");
        fs_1.default.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                return res.status(500).json({ error: "Failed to read the data file." });
            }
            try {
                const events = JSON.parse(data);
                const eventIndex = events.findIndex((event) => event.id === eventId);
                if (eventIndex === -1) {
                    return res.status(404).json({ error: "Event not found." });
                }
                // Update the specific event
                events[eventIndex] = Object.assign(Object.assign({}, events[eventIndex]), req.body);
                // Save the updated data
                fs_1.default.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
                res.status(200).json({ message: "Event updated successfully." });
            }
            catch (parseError) {
                console.error("Error parsing JSON data:", parseError);
                res.status(500).json({ error: "Invalid JSON format." });
            }
        });
    });
}
