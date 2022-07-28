/*==================================================
/client/src/components/Home/Home.js

It constructs a React component to display the home page and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Photos from '../Photos/Photos';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import { getPhotosBySearch } from '../../actions/Photos';
import useStyles from './styles';

// Extract query parameters from url
function useQuery() {
    return new URLSearchParams(useLocation().search);
};

const Home = () => {

    // Initialize states and React hooks
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [photos, setPhotos] = useState()
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    // Function called when User presses enter after entering a tag in the tag search bar
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPhoto();
        };
    };

    // Function called when tags are being added to an already existing photo
    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    // Function called when User wishes to delete a photo
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // Function called when someone attempts to query the photo database
    const searchPhoto = () => {
        if (search.trim() || tags) {
            dispatch(getPhotosBySearch({ search, tags: tags.join(",") }));

            navigate(`/photos/search?searchQuery=${search || "none"}&tags=${tags.join(",") || "none"}`);
        } else {
            navigate("/");
        };
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Photos"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPhoto} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        {!searchQuery && !tags.length && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        <Photos setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
