const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1', // Use IPv4 localhost

    user: 'root',
    password: 'zrVIC3e4kGCfYs',
    database: 'registration_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
