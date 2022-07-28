/*==================================================
/client/src/components/PhotoDetails/PhotoDetails.jsx

It constructs a React component to display the photo details page and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import moment from 'moment';

import { getPhoto, getPhotosBySearch } from '../../actions/Photos';

import useStyles from './styles';

const PhotoDetails = () => {

    // Initialize state and React hooks
    const { photo, photos, isLoading } = useSelector((state) => state.Photos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    // Gets the current photo based on its database ID number
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [id, dispatch]);

    // Queries the database to search for photos that share any tags with the current photo
    useEffect(() => {
        dispatch(getPhotosBySearch({search: "none", tags: photo?.tags.join(",")}));
    }, [photo, dispatch]);

    // If no such photo exists in the database, return null
    if (!photo) return null;

    // Display a circular progress bar if isLoading is true
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    };

    // Filter recommended photos so the current photo isn't displayed
    const recommendedPhotos = photos.filter(({ _id }) => _id !== photo._id);

    // If User clicks on a new photo's card, navigates User to that photo's details page
    const openPhoto = (_id) => {
        navigate(`/photos/${_id}`);
    };

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{photo.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{photo.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{photo.caption}</Typography>
                    <Typography variant="body1">{moment(photo.created).fromNow()}</Typography>
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={photo.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={photo.title} />
                </div>
            </div>
            {recommendedPhotos.length ? (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPhotos}>
                        {recommendedPhotos.map(({ title, caption, selectedFile, _id }) => (
                            <div key={_id} style={{ margin: "20px", cursor: "pointer" }} onClick={() => openPhoto(_id)}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{caption}</Typography>
                                <img src={selectedFile} alt={title} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </Paper>
    )
};

export default PhotoDetails;
