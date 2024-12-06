"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_1 = __importDefault(require("./api/eventos"));
const eventosID_1 = __importDefault(require("./api/eventosID"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // This middleware is important for handling JSON requests
// Define routes
app.get("/api/eventos", eventos_1.default); // Route for fetching eventos
app.put("/api/eventos/:id", eventosID_1.default); // Route for updating evento by ID
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
