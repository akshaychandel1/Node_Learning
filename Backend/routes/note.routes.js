"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../controllers/note.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All note routes require authentication
router.use(auth_1.authMiddleware);
router.get('/', note_controller_1.getAllNotes);
router.get('/:id', note_controller_1.getNoteById);
router.post('/', note_controller_1.createNote);
router.put('/:id', note_controller_1.updateNote);
router.delete('/:id', note_controller_1.deleteNote);
exports.default = router;
