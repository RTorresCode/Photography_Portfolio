import React from 'react';
//import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar,  } from '@material-ui/core';

import useStyles from './styles';
import Socials from '../Socials/Socials';

const Footer = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div></div>
            <Toolbar className={classes.toolbar}>
                <div align="center">
                    <Socials />
                </div>
            </Toolbar>
            <div></div>
        </AppBar>
    );
};

export default Footer;
