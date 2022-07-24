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

export default Photo;
