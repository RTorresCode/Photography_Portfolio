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

    // Gets the current photo's database ID number
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [id]);

    // Queries the database based on User input
    useEffect(() => {
        dispatch(getPhotosBySearch({search: "none", tags: photo?.tags.join(",")}));
    }, [photo]);

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

    // Filter photos in database by tag
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
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </Paper>


        //<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        //    <div className={classes.card}>
        //        <div className={classes.section}>
        //            <Typography variant="h3" component="h2">{photo.title}</Typography>
        //            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{photo.tags.map((tag) => `#${tag} `)}</Typography>
        //            <Typography gutterBottom variant="body1" component="p">{photo.caption}</Typography>
        //            <Typography variant="h6">Created by: me</Typography>
        //            <Typography variant="body1">{moment(photo.createdAt).fromNow()}</Typography>
        //            <Divider style={{ margin: "20px 0" }} />
        //            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        //            <Divider style={{ margin: "20px 0" }} />
        //            <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
        //            <Divider style={{ margin: "20px 0" }} />
        //        </div>
        //        <div className={classes.imageSection}>
        //            <img className={classes.media} src={photo.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={photo.title} />
        //        </div>
        //    </div>
        //</Paper>
    )
};

export default PhotoDetails;
