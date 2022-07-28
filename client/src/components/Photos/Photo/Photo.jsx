/*==================================================
/client/src/components/Photos/Photo/Photo.jsx

It constructs a React component to display a single photo and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyles from './styles';
import { deletePhoto } from '../../../actions/Photos';


const Photo = ({ photo, setCurrentId }) => {
    // Initialize state and React hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("profile"));

    // Function called when User attempts to delete a photo from the database
    const handleDelete = () => {
        try {
            dispatch(deletePhoto(photo._id)); // Dispatch action to redux
        } catch (err) {
            console.log(err.message);
        };

        navigate("/"); // Navigate User to Home page
    };

    // Navigates to a single photo's details page when a User clicks that photo's card
    const openPhoto = () => navigate(`/photos/${photo._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPhoto}>
                <CardMedia className={classes.media} image={photo.selectedFile} title={photo.title} component="div" />
                <div className={classes.overlay}>
                    <Typography variant="h6">{photo.title}</Typography>
                    <Typography variant="body2">{moment(photo.created).fromNow()}</Typography>
                </div>
                {(user?.result?._id === photo?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: "white" }} size="small" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(photo._id);
                        }}>
                            <EditIcon size="small" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{photo.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{photo.caption}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                {(user?.result?._id === photo?.creator) && (
                    <Button size="small" color="secondary" onClick={handleDelete}>
                        <DeleteIcon size="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Photo;
