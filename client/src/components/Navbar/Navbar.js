import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import logo from '../../images/logos/cat.jpg';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });
        setUser(null);

        navigate("/");
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        };

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, user?.token, logout]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <img className={classes.image} src={logo} alt="logo" height="60" />
            <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">SV Photography</Typography>
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
