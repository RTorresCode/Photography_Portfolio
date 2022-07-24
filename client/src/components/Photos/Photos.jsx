import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Photo from './Photo/Photo';
import useStyles from './styles';


const Photos = ({ setCurrentId }) => {
    const classes = useStyles();
    const { photos, isLoading } = useSelector((state) => state.Photos);

    if (!photos.length && !isLoading) return "No Photos";

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    photos.map((photo) => (
                        <Grid key={photo._id} item xs={12} sm={12} md={6} lg={3}>
                            <Photo photo={photo} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Photos;
