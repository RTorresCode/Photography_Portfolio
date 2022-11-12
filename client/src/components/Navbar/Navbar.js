/*==================================================
/client/src/components/Navbar/Navbar.js

It constructs a React component to display the navbar and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';

const Navbar = () => {

    // Initialize state and React hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    // Function that is called when User attempts to log out of their account
    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" }); // Dispatch action to redux
        setUser(null); // Clear current User

        navigate("/"); // Navigate User back to Home page
    }, [dispatch, navigate]);

    // Sets the current User if there is an authorization token present
    useEffect(() => {
        // '?' modifier is to ensure no error is thrown in case user doesn't exist
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token); // Verify token

            if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // Checks if token is expired
        };

        setUser(JSON.parse(localStorage.getItem("profile"))); // Sets the current User
    }, [location, user?.token, logout]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h1" alt="name" onClick={() => navigate("/")}>SV Photography</Typography>
            <CameraAltIcon className={classes.image} size="lg" alt="logo" onClick={() => navigate("/")} />
            {user ? (
                <Toolbar className={classes.toolbar}>
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                </Toolbar>
            ) : (
                    <div></div>
            )}
        </AppBar>
    );
};

export default Navbar;
