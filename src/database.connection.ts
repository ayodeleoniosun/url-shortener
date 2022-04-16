import 'dotenv/config';
import mongoose from 'mongoose';

const databaseConnection = () => {
  mongoose.connect(process.env.DB_URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
};

export default databaseConnection;
