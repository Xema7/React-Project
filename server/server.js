import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import UserRoute from './routes/UserRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users",UserRoute);


app.listen(PORT, () => {
  connectDB();
  console.log('Server running at http://localhost:' + PORT);
});


