/*==================================================
/client/src/components/Auth/Input.js

It constructs a React component to display the hide/show password button on password & confirm password input fields.
================================================== */

// Import modules
import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword, handleShowConfirmPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={
                    name === "password" ?
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {type = "password" ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        } : name === "confirmPassword" ?
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowConfirmPassword}>
                                        {type = "password" ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        } : null
                }
            />
        </Grid>
    )
}

export default Input;
