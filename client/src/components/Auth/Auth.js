/*==================================================
/client/src/components/Auth/Auth.js

It constructs a React component to display the sign in/sign up page and is responsible for stateful logic.
================================================== */

// Import modules
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signUp, signIn } from '../../actions/Auth';
import Input from './Input';

import useStyles from './styles';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {

    // Initialize states and React hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    // Function that is called when User submits the sign in/sign up form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        };
    };

    // Handles any changes in the input values
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Shows/hides User's currently entered password when pressed
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Shows/hides User's currently entered password confirmation when pressed
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    // Changes which form is currently being displayed(sign in vs. sign up)
    // and resets the show password states
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showConfirmPassword ? "text" : "password"} handleShowConfirmPassword={handleShowConfirmPassword} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already Have an account? Sign in here" : "Don't have an account? Sign up here"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
