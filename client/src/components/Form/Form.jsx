/*==================================================
/client/src/components/Form/Form.jsx

It constructs a React component to display the photo edit/upload form and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { addPhoto, updatePhoto } from '../../actions/Photos';

const Form = ({ currentId, setCurrentId }) => {

    // Initialize states and React hooks
    const navigate = useNavigate();
    const [photoData, setPhotoData] = useState({
        title: "", caption: "", tags: "", selectedFile: ""
    });
    const [user] = useState(JSON.parse(localStorage.getItem("profile")));

    const photo = useSelector((state) => currentId ? state.Photos.photos.find((photo) => photo._id === currentId) : null);

    const classes = useStyles();
    const dispatch = useDispatch();

    // If a photo is selected to be edited, automatically sets the state to have that selected photo's data
    useEffect(() => {
        if (photo) setPhotoData(photo);
    }, [photo]);

    // Function called when User submits the photo edit/upload form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePhoto(currentId, { ...photoData }));
            clear(e);
        } else {
            dispatch(addPhoto({ ...photoData }, navigate));
            clear(e);
        };
    };

    // Function called to clear the form data
    const clear = (e) => {
        e.preventDefault();

        setCurrentId(null);
        setPhotoData({ title: "", caption: "", tags: "", selectedFile: "" });
    };

    return (
        <>
            {user && (
                <Paper className={classes.paper} elevation={6}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <Typography variant="h6">{currentId ? "Editing" : "Post"} Photo</Typography>
                        <TextField
                            name="title"
                            variant="outlined"
                            label="Title"
                            value={photoData.title}
                            onChange={(e) => setPhotoData({ ...photoData, title: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            name="caption"
                            variant="outlined"
                            label="Caption"
                            value={photoData.caption}
                            onChange={(e) => setPhotoData({ ...photoData, caption: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            value={photoData.tags}
                            onChange={(e) => setPhotoData({ ...photoData, tags: e.target.value.split(",") })}
                            fullWidth
                        />
                        <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={(base64) => setPhotoData({ ...photoData, selectedFile: base64.base64 })}
                            />
                        </div>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                            Clear
                        </Button>
                    </form>
                </Paper>
            )}
        </>
    );
};

export default Form;
