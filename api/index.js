import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

const app = express();

app.use("/crystalEstateApp", userRoutes)

app.listen(3000, () => {
    console.log('Server is listining on port 3000!!!');
});