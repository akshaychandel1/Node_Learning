"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const db_1 = require("../config/db");
const createUser = async (user) => {
    const { name, email } = user;
    const result = await db_1.pool.query('INSERT INTO users(name,email) VALUES($1,$2) RETURNING *', [name, email]);
    return result.rows[0];
};
exports.createUser = createUser;
const getUsers = async () => {
    const result = await db_1.pool.query('SELECT * FROM users');
    return result.rows;
};
exports.getUsers = getUsers;
const updateUser = async (id, user) => {
    const { name, email } = user;
    const result = await db_1.pool.query('UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *', [name, email, id]);
    return result.rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const result = await db_1.pool.query('DELETE FROM users WHERE id=$1 RETURNING id', [id]);
    return result.rows.length > 0;
};
exports.deleteUser = deleteUser;
