/*==================================================
/server/database/models/User.js

It defines the User model for the database.
==================================================*/

// Import mongoose module (MongoDB)
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
});

// Export User model
export default mongoose.model("User", userSchema);
