/*==================================================
/server/routes/Photos.js

It defines all the Photo-related routes.
==================================================*/

// Import Express module
import express from 'express';

// Create an Express router function called "router"
const router = express.Router();

// Import controllers
import * as ctrs from '../controllers/Photos.js';

// Import Authorization middleware
import auth from '../middleware/auth.js';


/* GET ALL PHOTOS */
router.get("/", ctrs.getPhotos);

/* GET PHOTOS BY SEARCH */
router.get("/search", ctrs.getPhotosBySearch);

/* GET SINGLE PHOTO */
router.get("/:id", ctrs.getPhoto);

/* ADD NEW PHOTO */
router.post("/", auth, ctrs.addPhoto);

/* UPDATE PHOTO */
router.patch("/:id", auth, ctrs.updatePhoto);

/* DELETE PHOTO */
router.delete("/:id", auth, ctrs.deletePhoto);


// Export router, so that it can be imported to construct the apiRouter (server.js)
export default router;
