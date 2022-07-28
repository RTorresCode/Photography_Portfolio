/*==================================================
/client/src/App.jsx

Contains the client-side routes
================================================== */

// Import modules
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PhotoDetails from './components/PhotoDetails/PhotoDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile")); // Get User information from localStorage, if it exists

    // Client-side routes are stored inside the BrowserRouter
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/photos" replace />} />
                    <Route path="/photos" element={<Home />} />
                    <Route path="/photos/search" element={<Home />} />
                    <Route path="/photos/:id" element={<PhotoDetails />} />
                    <Route path="/login" element={(!user ? <Auth /> : <Navigate to="/photos" replace />)} />
                </Routes>
                <Footer />
            </Container>
        </BrowserRouter>
    )
}

export default App;
