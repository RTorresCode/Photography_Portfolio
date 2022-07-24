/*==================================================
server/database/models/Photo.js

It defines the Photo model for the database.
==================================================*/

// Import mongoose module (MongoDB)
import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
    title: String,
    caption: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    created: {
        type: Date,
        default: new Date()
    }
});

const Photo = mongoose.model("Photo", photoSchema);

// Export Photo model
export default Photo;
