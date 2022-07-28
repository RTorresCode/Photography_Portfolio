/*==================================================
/client/src/api/index.js

Handles all of the frontend routing.
================================================== */

// Import modules
import axios from 'axios';

// Create axios object
const API = axios.create({ baseURL: "http://localhost:3005/api" });

// Attach authorization token to the header of every request made by a User
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    };

    return req;
});

// Set up all routes related to photos
export const fetchPhoto = (id) => API.get(`/photos/${id}`);
export const fetchPhotos = (page) => API.get(`/photos?page=${page}`);
export const fetchPhotosBySearch = (searchQuery) => API.get(`/photos/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags || "none"}`);
export const addPhoto = (newPhoto) => API.post("/photos", newPhoto);
export const updatePhoto = (id, updatedPhoto) => API.patch(`/photos/${id}`, updatedPhoto);
export const deletePhoto = (id) => API.delete(`/photos/${id}`);

// Set up all routes related to users
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
