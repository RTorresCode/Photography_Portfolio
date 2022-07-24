import jwt from 'jsonwebtoken';
import ash from 'express-async-handler';

const auth = ash(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    let decodedData;

    if (token) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedData?.id;
    } else {
        res.status(401).json({ message: "Invalid authorization token" });
    };

    next();
});

export default auth;
