// @ts-ignore: no declaration file for pg
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
})

export const testDB = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Database connection OK');
    } catch (err: any) {
        console.error('Failed to connect to the database. Please check Backend/.env and your Postgres server.');
        console.error('DB error:', err.message || err);
        throw err;
    }
}