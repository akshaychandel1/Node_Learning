import dotenv from 'dotenv';
dotenv.config();

const db = require('./config/db');
console.log('db export snapshot:', db);

(async () => {
  try {
    await db.testDB();
    console.log('testDB ok');
  } catch (err: any) {
    console.error('testDB failed:', err);
    process.exit(1);
  }
})();
