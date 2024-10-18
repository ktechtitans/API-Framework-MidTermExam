// Import libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");
const cors = require("cors");

//Initialize the express app
const app = express();

//MongoDb Atlas connection string
const mongoURI = 'mongodb+srv://kanchan:<db_password>@cluster0.t0y4q.mongodb.net/';

// Connect to MongoDB
mongoose
  .connect(MongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("You are connected to MongoDB"))
  .catch((err) => console.error(err));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});