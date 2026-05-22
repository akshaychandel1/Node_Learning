import { pool } from '../config/db';
import { User } from '../types/user.types';

export const createUser = async (user: User) => {
  const { name, email } = user;

  const result = await pool.query(
    'INSERT INTO users(name,email) VALUES($1,$2) RETURNING *',
    [name, email]
  );

  return result.rows[0];
};

export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');

  return result.rows;
};

export const updateUser = async (
  id: string,
  user: User
) => {
  const { name, email } = user;

  const result = await pool.query(
    'UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *',
    [name, email, id]
  );

  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING id', [id]);
  return result.rows.length > 0;
};

export const updatePermissions = async (id: string, role?: string, permissions?: any) => {
  const result = await pool.query(
    'UPDATE users SET role = COALESCE($1, role), permissions = COALESCE($2, permissions) WHERE id=$3 RETURNING *',
    [role || null, permissions ? JSON.stringify(permissions) : null, id]
  );

  return result.rows[0];
};