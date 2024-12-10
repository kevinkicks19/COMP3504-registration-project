const express = require('express');
const router = express.Router();
const database = require('./database/database');

// Account Creation Route
router.post('/accountcreation', async (req, res) => {
    const { username, password, firstname, lastname, role, pronouns, dietary_restrictions } = req.body;

    if (!username || !password || !firstname || !lastname || !role || !pronouns) {
        return res.status(400).json({ status: "Unsuccess", message: "All fields are required." });
    }

    try {
        // Insert user into the database
        const query = `
            INSERT INTO User(username, password, first_name, last_name, role, pronouns, dietary_restrictions)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await database.query(query, [
            username,
            password,
            firstname,
            lastname,
            role,
            pronouns,
            dietary_restrictions,
        ]);

        res.status(201).json({ status: "Success", message: "Account created successfully." });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ status: "Unsuccess", message: "Server error." });
    }
});
//console.log('Received role:', role);


module.exports = router;
