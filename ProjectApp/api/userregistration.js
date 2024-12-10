const express = require('express');
const router = express.Router();
const database = require('./database/database'); // Adjust path if necessary

// Register for a Conference
router.post('/register', async (req, res) => {
    const { userID, venueID } = req.body;

    // Validate input
    if (!userID || !venueID) {
        return res.status(400).json({ message: 'UserID and VenueID are required.' });
    }

    try {
        // Insert the registration into the database
        const query = `
            INSERT INTO Registrations (UserID, VenueID, DateRegistered)
            VALUES (?, ?, NOW())`;
        const [result] = await database.query(query, [userID, venueID]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Registration successful.' });
        } else {
            res.status(500).json({ message: 'Registration failed.' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
