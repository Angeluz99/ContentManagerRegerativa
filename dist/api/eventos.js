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
exports.default = eventosHandler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the API handler for fetching events
function eventosHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Assuming you have a data file
        const filePath = path_1.default.join(__dirname, "data.json");
        // Read the JSON file
        fs_1.default.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                return res.status(500).json({ error: "Failed to read the data file." });
            }
            try {
                const events = JSON.parse(data);
                res.json(events); // Respond with the events data
            }
            catch (parseError) {
                console.error("Error parsing JSON data:", parseError);
                res.status(500).json({ error: "Invalid JSON format." });
            }
        });
    });
}
