const express = require('express');
const router = express.Router();
const database = require('./database/database');

// GET all Venues
router.get('/venues', async (req, res) => {
    try {
        const [venues] = await database.query('SELECT * FROM Venue');
        res.status(200).json(venues);
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(500).send("Server error");
    }
});

// GET Venues with Filters
router.get('/venues/filter', async (req, res) => {
    const { name, location, type, date } = req.query;
    let query = 'SELECT * FROM Venue WHERE 1=1';
    const queryParams = [];

    if (name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${name}%`);
    }
    if (location) {
        query += ' AND location LIKE ?';
        queryParams.push(`%${location}%`);
    }
    if (type) {
        query += ' AND type = ?';
        queryParams.push(type);
    }
    if (date) {
        query += ' AND date = ?';
        queryParams.push(date);
    }

    try {
        const [venues] = await database.query(query, queryParams);
        res.status(200).json(venues);
    } catch (error) {
        console.error('Error fetching filtered venues:', error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
