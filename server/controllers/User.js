import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ash from 'express-async-handler';

import User from '../database/models/User.js';

export const signIn = ash(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).json({ message: "Incorrect email/password combination"});

    const authenticatePassword = await bcrypt.compare(password, existingUser.password);
    if (!authenticatePassword) return res.status(400).json({message: "Incorrect email/password combination"});

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
});

export const signUp = ash(async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const fName = firstName.substr(0, 1).toUpperCase() + firstName.substr(1);
    const lName = lastName.substr(0, 1).toUpperCase() + lastName.substr(1);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "That email is already registered" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ email, password: hashedPassword, name: `${fName} ${lName}` });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: newUser, token });
});
