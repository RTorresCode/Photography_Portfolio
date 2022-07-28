/*==================================================
File was part of original postgres db implementation. It is now deprecated.
==================================================*/

// Import module dependencies
const Sequelize = require('sequelize');  // Import Sequelize
const { dbName, dbUser, dbPwd } = require('./utils/configDB');  // Import database name, username, password

// Display a confirmation message for opening a database connection
console.log("Connected to postgres database");

// This is the Sequelize entry point for connecting to the database. 
// Instantiate the Sequelize instance with database name, username, and password. Then connect to the database.
const db = new Sequelize(dbName, dbUser, dbPwd, {
    host: "localhost",
    dialect: "postgres"
});

// Export Sequelize instance, which will be modified with models.
module.exports = db;
