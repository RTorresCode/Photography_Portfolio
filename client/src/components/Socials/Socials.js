import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Typography } from '@material-ui/core';

import useStyles from './styles';

const Socials = () => {
    const classes = useStyles();

    return (
        <div className={classes.socialsContainer}>
            <Typography variant="h6">Follow Me on Social Media:</Typography>
            <div>
                <FacebookIcon className={classes.icons} fontSize="large" color="primary" />
                <InstagramIcon className={classes.icons} fontSize="large" color="inherit" />
                <PinterestIcon className={classes.icons} fontSize="large" color="secondary" />
            </div>
            <div>
                <Typography variant="body1" className={classes.links}>Facebook</Typography>
                <Typography variant="body1" className={classes.links}>Instagram</Typography>
                <Typography variant="body1" className={classes.links}>Pinterest</Typography>
            </div>
        </div>
    )
}

export default Socials;
