const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 1. Force the correct port from Aiven (defaults to 22520 if env variable isn't read)
    port: process.env.DB_PORT || 22520, 
    waitForConnections: true,
    // 2. Lower connection limit slightly (better practice for serverless pools)
    connectionLimit: 5, 
    queueLimit: 0,
    // 3. MANDATORY FOR AIVEN: Force encrypted SSL communication
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;