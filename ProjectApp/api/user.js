const express = require('express');
const router = express.Router();
const database = require('./database/database'); // Your database connection file

// POST Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Fetch the user from the database
        const query = 'SELECT * FROM User WHERE username = ?';
        const [users] = await database.query(query, [username]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];

        // Compare plaintext passwords directly (not secure, for educational purposes only)
        if (password === user.password) {
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.ID,
                    username: user.username,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name,
                },
            });
        } else {
            res.status(401).json({ error: "Invalid password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
