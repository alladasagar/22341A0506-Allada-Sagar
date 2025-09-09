import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});