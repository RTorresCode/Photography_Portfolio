const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the photo model
const Photo = db.define("photo", {
    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: "1",
        validate: {
            notEmpty: true
        }
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    caption: {
        type: Sequelize.STRING,
        defaultValue: ""
    },

    tags: {
        type: Sequelize.STRING,
        defaultValue: ""
    },

    selected_file: {
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

// Export the photo model
module.exports = Photo;
