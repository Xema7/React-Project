import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's URL
}));

app.use(express.json());

app.use("/api/users",UserRoute);


app.listen(PORT, () => {
  connectDB();
  console.log('Server running at http://localhost:' + PORT);
});


