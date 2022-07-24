import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:3005/api" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    };

    return req;
});

export const fetchPhoto = (id) => API.get(`/photos/${id}`);
export const fetchPhotos = (page) => API.get(`/photos?page=${page}`);
export const fetchPhotosBySearch = (searchQuery) => API.get(`/photos/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags || "none"}`);
export const addPhoto = (newPhoto) => API.post("/photos", newPhoto);
export const updatePhoto = (id, updatedPhoto) => API.patch(`/photos/${id}`, updatedPhoto);
export const deletePhoto = (id) => API.delete(`/photos/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
