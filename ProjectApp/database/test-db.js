const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();
const database = require('./database/database'); 
// Database connection configuration
const pool = mysql.createPool({
    host: '127.0.0.1', // Use 'localhost' or the actual database host
    user: 'root', // Replace with your database username
    password: 'zrVIC3e4kGCfYs', // Replace with your database password
    database: 'registration_system' // Replace with your database name
});

// Test database connection
(async () => {
    try {
        console.log('Testing database connection...');
        const connection = await pool.getConnection();
        console.log('Database connection successful!');

        // Test a simple query
        const [rows] = await connection.query('SELECT 1');
        console.log('Query result:', rows);

        connection.release(); // Release the connection back to the pool
        console.log('Connection released.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        process.exit();
    }
})();

module.exports = router;
