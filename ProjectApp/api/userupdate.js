const express = require('express');
const router = express.Router();
const database = require('./database/database');

// Update user profile
router.put('/api/userupdate', async (req, res) => {
    const userId = req.user?.ID; // Extract user ID from token or session

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }

    const { first_name, last_name, pronouns, dietary_restrictions } = req.body;

    // Check if at least one field to update is provided
    if (!first_name && !last_name && !pronouns && !dietary_restrictions) {
        return res.status(400).json({ message: 'Please provide data to update.' });
    }

    const updates = [];
    const params = [];

    // Dynamically add fields to update
    if (first_name) {
        updates.push('first_name = ?');
        params.push(first_name);
    }
    if (last_name) {
        updates.push('last_name = ?');
        params.push(last_name);
    }
    if (pronouns) {
        updates.push('pronouns = ?');
        params.push(pronouns);
    }
    if (dietary_restrictions) {
        updates.push('dietary_restrictions = ?');
        params.push(dietary_restrictions);
    }

    // Add the user ID to the query parameters
    params.push(userId);

    try {
        // Build and execute the dynamic query
        const query = `UPDATE User SET ${updates.join(', ')} WHERE ID = ?`;
        const [result] = await database.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;