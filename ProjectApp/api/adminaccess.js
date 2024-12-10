const express = require('express');
const router = express.Router();
const database = require('./database/database'); // Adjust the path as necessary

// Validate Admin Login (Username and Password)
router.post('/admins/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const query = `SELECT * FROM Admin WHERE Username = ?`;
        const [admins] = await database.query(query, [username]);

        if (admins.length === 0) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        const admin = admins[0];

        // Simple password comparison (no hashing for school project)
        if (admin.Password === password) {
            res.status(200).json({ message: 'Login successful', admin });
        } else {
            res.status(401).json({ message: 'Invalid password.' });
        }
    } catch (error) {
        console.error('Error validating admin:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
