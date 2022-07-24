/*==================================================
/middleware/auth.js

It provides the backend with authorization through JSON Web Tokens (JWT).
==================================================*/

// Import modules
import jwt from 'jsonwebtoken';
import ash from 'express-async-handler';

// Asynchronous function that takes 3 parameters (req, res, next) and extracts the
// authorization token from the req.headers object, verifies the token using JWT,
// then grants or denies the user access, and finally passes that information
// along to the next middleware
const auth = ash(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Extract entire JWT from req.headers and split it at the first blank space encountered
    
    let decodedData;

    if (token) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET); // JWT SECRET can be set in .env file in main server directory

        req.userId = decodedData?.id; // Extract user's ID from the decoded JWT
    } else {
        res.status(401).json({ message: "Invalid authorization token" });
    };

    next(); // Pass result to next middleware
});

export default auth; // Export module
