// Import libraries and modules
const express = require('express');
const mongoose = require('mongoose');

//Initialize the express app
const app = express();

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});