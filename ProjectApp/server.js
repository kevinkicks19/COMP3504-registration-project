const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors')

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON requests
app.use(express.json());

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Add a base test route
app.get('/api', (req, res) => {
    res.send('Welcome to the API root');
});

// Dynamically load and mount API route files
const apiFolder = path.join(__dirname, 'api');
fs.readdirSync(apiFolder).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(apiFolder, file));
        
        // Ensure the file exports a valid router
        if (typeof route === 'function' || typeof route.use === 'function') {
            console.log(`Mounting route file: ${file}`);
            app.use('/api', route);
        } else {
            console.error(`File ${file} does not export a valid router.`);
        }
    }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
