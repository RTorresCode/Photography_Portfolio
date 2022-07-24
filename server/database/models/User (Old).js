/*==================================================
File was part of original postgres db implementation. It is now obselete.
==================================================*/

const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the user model
const User = db.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    created: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    }
});

// Export the user model
module.exports = User;
