/**
 * File: server.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 18-10-2024
 */
// Import libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");
const cors = require("cors");

// Initialize the express app
const app = express();

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://kanchan:kanchan123@cluster0.t0y4q.mongodb.net/';

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error(err));

// Middleware
app.use(cors()); 
app.use(express.json());

// Load team data from the JSON file
const teamData = JSON.parse(fs.readFileSync("./teams.json", "utf-8")); 

// Define Team model
const Team = mongoose.model('Team', new mongoose.Schema({
  teamId: { type: String, required: true },
  city: { type: String, required: true },
}));

// Import Team Data into MongoDB
const importTeams = async (req, res) => {
  try {
    const count = await Team.countDocuments();
    if (count === 0) {
      await Team.create(teamData);
      console.log("Team data successfully imported to MongoDB");
      res.status(200).send("Team data successfully imported");
    } else {
      console.log("Team data already in the database");
      res.status(200).send("Team data already in the database");
    }
  } catch (e) {
    console.error("Error importing team data", e);
    res.status(500).send("Error importing team data");
  }
};

// API to get all teams
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find(); 
    res.json(teams); 
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).send("Error fetching teams");
  }
});

// API to get a team by ID
app.get("/teamId/:teamId", async (req, res) => { 
  const teamId = req.params.teamId; 
  try {
    const team = await Team.findOne({ teamId: teamId }); 
    if (team) {
      res.json(team); 
    } else {
      res.status(404).send("Team not found");
    }
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).send("Error fetching team");
  }
});

// API to get teams by city
app.get("/teams/city/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const teams = await Team.find({ city: city });
    res.json(teams); 
  } catch (error) {
    console.error("Error fetching teams by city:", error);
    res.status(500).send("Error fetching teams by city");
  }
});

// Endpoint to import team data
app.get("/upload-teams", importTeams); 

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});