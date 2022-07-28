/*==================================================
/server/controllers/Photos.js

Controls all of the Photo actions a User can take when using the backend API.
Gets imported and used by routes/Photos.js
==================================================*/

// Import modules
import ash from 'express-async-handler';
import mongoose from 'mongoose';

// Import Photo database model
import Photo from '../database/models/Photo.js';

export const getPhoto = ash(async (req, res) => {
    const { id } = req.params; // Destructure data from req.params

    const photo = await Photo.findById(id); // Query database for photo using the photo_id

    res.status(200).json(photo); // Return photo if found
});

export const getPhotos = ash(async (req, res) => {
    const { page } = req.query; // Destructure data from req.query

    const LIMIT = 8; // Setting the maximum amount of photos that are viewable per page
    const startIndex = (Number(page) - 1) * LIMIT; // Sets where the backend will start to query the database
    const total = await Photo.countDocuments({}); // Query database and return total amount of photos

    const photos = await Photo.find().sort({id: -1}).limit(LIMIT).skip(startIndex); // Query database to display no more than the LIMIT of photos after the startIndex
    res.status(200).json({ data: photos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) }); // Return photos on the current page
});

export const getPhotosBySearch = ash(async (req, res) => {
    const { searchQuery, tags } = req.query; // Destructure data from req.query

    const title = new RegExp(searchQuery, "i"); // Sets the values in the searchQuery to all be read as lower-case ("i" flag stands for ignore case)

    const photos = await Photo.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] }); // Query database using the given search parameters

    res.status(200).json({ data: photos }); // Return the photos if found
});

export const addPhoto = ash(async (req, res) => {
    const { title, caption, tags, selectedFile } = req.body; // Destructure data from req.body

    const fixedTags = tags.map((tag) => { // Fixes tags entered by user so that if the first character in a tag is a blank space it is removed
        if (tag[0] === " ") {
            return tag.substr(1);
        } else {
            return tag;
        }
    });

    const newPhoto = new Photo({ title, caption, tags: fixedTags, selectedFile, creator: req.userId, created: new Date().toISOString() });

    // Save new photo to database
    await newPhoto.save();
    res.status(201).json(newPhoto); // Return the newly added photo
});

export const updatePhoto = ash(async (req, res) => {
    const { id: _id } = req.params; // Destructure the photo id from req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No photo with that ID"); // Check to ensure valid photo is chosen

    const { title, caption, tags, creator, created } = req.body; //Destructure data from req.body

    const fixedTags = tags.map((tag) => { // Fixes tags entered by user so that if the first character in a tag is a blank space it is removed
        if (tag[0] === " ") {
            return tag.substr(1);
        } else {
            return tag;
        }
    });

    // Update selected photo with entered data
    const updatedPhoto = await Photo.findByIdAndUpdate(_id, { title, caption, tags: fixedTags, creator, created, _id }, { new: true });

    res.status(201).json(updatedPhoto); // Return the updated photo
});

export const deletePhoto = ash(async (req, res) => {
    const { id: _id } = req.params; // Destructure the photo id from req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No photo with that ID"); // Check to ensure valid photo is chosen

    // Delete photo from database
    const deletedPhoto = await Photo.findByIdAndRemove(_id);

    res.status(200).json({ message: "Photo successfully deleted" }); // Return success message
});
