/*==================================================
/client/src/components/Pagination/Pagination.jsx

It constructs a React component to display the page selector and is responsible for stateful logic and data fetching.
================================================== */

// Import modules
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';

import { getPhotos } from '../../actions/Photos';

import useStyles from './styles';

const Paginate = ({ page }) => {

    // Initialize state and React hooks
    const { numberOfPages } = useSelector((state) => state.Photos);
    const classes = useStyles();
    const dispatch = useDispatch();

    // Returns the proper set of photos, depending on the current page
    useEffect(() => {
        if (page) dispatch(getPhotos(page));
    }, [page, dispatch]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/photos?page=${item.page}`} />
            )}
        />
    )
};

export default Paginate;
