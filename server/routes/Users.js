/*==================================================
server/routes/Users.js

It defines all the User-related routes.
==================================================*/

// Import Express module
import express from 'express';

// Create an Express router function called "router"
const router = express.Router();

// Import controllers
import { signIn, signUp } from '../controllers/User.js';

// Import Authorization middleware
import auth from '../middleware/auth.js';


/* SIGN IN */
router.post("/signin", signIn);

/* SIGN UP */
router.post("/signup", signUp);


// Export router, so that it can be imported to construct the apiRouter (server.js)
export default router;
