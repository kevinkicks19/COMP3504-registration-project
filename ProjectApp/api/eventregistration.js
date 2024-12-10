const express = require('express');
const router = express.Router();
const database = require('./database/database.js');

// Create a new venue
router.post('/eventregistration', async (req, res) => {
    const {
        name,
        location,
        date,
        start_time,
        end_time,
        description,
        registration_fee,
        max_capacity,
    } = req.body;

    // Validation
    if (!name || !location || !date || !start_time || !end_time || !registration_fee || !max_capacity) {
        return res.status(400).json({ message: 'All fields are required for creating a venue.' });
    }

    try {
        const query = `
            INSERT INTO Venue 
            (name, location, date, start_time, end_time, description, registration_fee, max_capacity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, location, date, start_time, end_time, description, registration_fee, max_capacity];
        const [result] = await database.query(query, values);

        res.status(201).json({ message: 'Venue created successfully', venue_id: result.insertId });
    } catch (error) {
        console.error('Error creating venue:', error);
        res.status(500).json({ message: 'An error occurred while creating the venue.' });
    }
});

module.exports = router;
