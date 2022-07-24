/*==================================================
server/server.js

This is the top-level (main) file for the server application.
It is the first file to be called when starting the server application.
It initiates all required parts of server application such as Express, routes, database, etc.
==================================================*/

// Import modules
import dotenv from 'dotenv';
dotenv.config(); // Set up .env variables

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRouter from './routes/index.js';

// Create an Express application called "app"
const app = express();

// Apply middlewares and other settings
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Allows uploading of files up to 30MB in size (images)
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', apiRouter); // Import sub-routes and associated router functions

// Set up express application to use port 3005 as the access point for the server application
// Connect to MongoDB database using MONGO_URL (set variable in .env file)
const PORT = process.env.PORT || 3005; // PORT variable can be set in .env file
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log(`Connected to MongoDB database. Server running on port ${PORT}.`)))
    .catch((err) => console.log(err.message));
