/*==================================================
/routes/index.js

It defines all the routes used by the Express application.
==================================================*/

// Import Express module
import express from 'express';

// Create an Express router function called "router"
const router = express.Router();

// Sub-Routers ("photos", "users")
import photosRouter from './Photos.js'; // Import "Photos" sub-router functions
import usersRouter from './Users.js'; // Import "Users" sub-router functions

// Set up sub-route's top-level route and attach all sub-routes to it
router.use('/photos', photosRouter);  // Add top-level URL path "/photos" before sub-routes
router.use('/user', usersRouter);  // Add top-level URL path "/users" before sub-routes

// Export sub-routers, so that they can be used by the top-level (main) file server.js
export default router;
