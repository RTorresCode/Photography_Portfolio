import ash from 'express-async-handler';
import mongoose from 'mongoose';

import Photo from '../database/models/Photo.js';

export const getPhoto = ash(async (req, res) => {
    const { id } = req.params;

    const photo = await Photo.findById(id);

    res.status(200).json(photo);
});

export const getPhotos = ash(async (req, res) => {
    const { page } = req.query;

    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Photo.countDocuments({});

    const photos = await Photo.find().sort({id: -1}).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: photos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
});

export const getPhotosBySearch = ash(async (req, res) => {
    const { searchQuery, tags } = req.query;

    const title = new RegExp(searchQuery, "i");

    const photos = await Photo.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

    res.status(200).json({ data: photos });
});

export const addPhoto = ash(async (req, res) => {
    const { title, caption, tags, selectedFile } = req.body;

    const fixedTags = tags.map((tag) => {
        if (tag[0] === " ") {
            return tag.substr(1);
        } else {
            return tag;
        }
    });

    const newPhoto = new Photo({ title, caption, tags: fixedTags, selectedFile, creator: req.userId, created: new Date().toISOString() });

    await newPhoto.save();
    res.status(201).json(newPhoto);
});

export const updatePhoto = ash(async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No photo with that ID");

    const { title, caption, tags, creator, created } = req.body;

    const fixedTags = tags.map((tag) => {
        if (tag[0] === " ") {
            return tag.substr(1);
        } else {
            return tag;
        }
    });

    const updatedPhoto = await Photo.findByIdAndUpdate(_id, { title, caption, tags: fixedTags, creator, created, _id }, { new: true });

    res.status(201).json(updatedPhoto);
});

export const deletePhoto = ash(async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No photo with that ID");

    const deletedPhoto = await Photo.findByIdAndRemove(_id);

    res.status(200).json({ message: "Photo successfully deleted" });
});
