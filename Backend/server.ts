import dotenv from 'dotenv';
import app from './app';
import { testDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;
console.log('Server env DB_USER=', process.env.DB_USER, 'DB_NAME=', process.env.DB_NAME, 'DB_HOST=', process.env.DB_HOST);
const start = async () => {
  try {
    await testDB();
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup aborted due to database connection issues.');
    process.exit(1);
  }
};

start();