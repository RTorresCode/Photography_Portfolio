/*==================================================
server/controllers/User.js

Controls all of the actions a User can take when using the backend API.
Gets imported and used by routes/Users.js
==================================================*/

// Import modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ash from 'express-async-handler';

// Import User database model
import User from '../database/models/User.js';


export const signIn = ash(async (req, res) => {
    const { email, password } = req.body; // Destructure data from req.body

    const existingUser = await User.findOne({ email }); // Query database to check if email already exists
    if (!existingUser) return res.status(400).json({ message: "Incorrect email/password combination"}); // If not, send error

    const authenticatePassword = await bcrypt.compare(password, existingUser.password); // If user is found, verify login information
    if (!authenticatePassword) return res.status(400).json({message: "Incorrect email/password combination"}); // Send error if verification failed

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // JWT_SECRET can be set in .env file

    res.status(200).json({ result: existingUser, token }); // User is successfully logged in
});

export const signUp = ash(async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Destructure data from req.body

    // Fixing user input to ensure first & last name begin with capital letters
    const fName = firstName.substr(0, 1).toUpperCase() + firstName.substr(1);
    const lName = lastName.substr(0, 1).toUpperCase() + lastName.substr(1);

    const existingUser = await User.findOne({ email }); // Query database to check if email already exists
    if (existingUser) return res.status(400).json({ message: "That email is already registered" }); // If so, send error
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" }); // Password correctness check

    const hashedPassword = await bcrypt.hash(password, 12); // Take entered password and create hash using bcrypt

    const newUser = await User.create({ email, password: hashedPassword, name: `${fName} ${lName}` }); // Add new user to database

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // JWT_SECRET can be set in .env file

    res.status(200).json({ result: newUser, token }); // User was successfully signed up
});
