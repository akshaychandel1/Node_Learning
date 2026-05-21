"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/users', user_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/notes', note_routes_1.default);
exports.default = app;
