"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAll = exports.create = void 0;
const user_service_1 = require("../services/user.service");
const create = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({
                error: 'Name and email are required',
            });
            return;
        }
        const user = await (0, user_service_1.createUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        if (error.code === '23505') {
            res.status(409).json({
                error: 'Email already exists',
            });
        }
        else {
            res.status(500).json({
                error: 'Failed to create user',
            });
        }
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const users = await (0, user_service_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users',
        });
    }
};
exports.getAll = getAll;
const update = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({
                error: 'Name and email are required',
            });
            return;
        }
        const user = await (0, user_service_1.updateUser)(String(req.params.id), req.body);
        if (!user) {
            res.status(404).json({
                error: 'User not found',
            });
            return;
        }
        res.json(user);
    }
    catch (error) {
        if (error.code === '23505') {
            res.status(409).json({
                error: 'Email already exists',
            });
        }
        else {
            res.status(500).json({
                error: 'Failed to update user',
            });
        }
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const deleted = await (0, user_service_1.deleteUser)(String(req.params.id));
        if (!deleted) {
            res.status(404).json({
                error: 'User not found',
            });
            return;
        }
        res.json({
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Failed to delete user',
        });
    }
};
exports.remove = remove;
