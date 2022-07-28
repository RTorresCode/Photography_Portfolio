/*==================================================
File was part of original postgres db implementation. It is now deprecated.
==================================================*/

const db = require('./db');  // Database instance

require('../database/models');  // Export models

module.exports = db;  // Export database instance


////const { Pool } = require("pg");

////const pool = new Pool();
////module.exports = {
////    query: (text, params) => pool.query(text, params),
////};

////console.log("Connected to postgres database");
