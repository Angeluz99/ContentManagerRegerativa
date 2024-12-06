"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(
  (0, cors_1.default)({ origin: "https://your-github-pages-domain.github.io" })
);
app.use(express_1.default.json());
// Path to the JSON file
const filePath = path_1.default.join(__dirname, "data.json");
// API to get JSON data
app.get("/api/eventos", (req, res) => {
  const filePath = path_1.default.join(__dirname, "data.json");
  fs_1.default.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err); // Logs the error details
      return res.status(500).json({ error: "Failed to read the data file." });
    }
    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
});
// API to update JSON data
app.post("/api/eventos", (req, res) => {
  try {
    const updatedData = req.body;
    fs_1.default.writeFileSync(
      filePath,
      JSON.stringify(updatedData, null, 2),
      "utf-8"
    );
    res.status(200).json({ message: "Data updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to write to the data file." });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
