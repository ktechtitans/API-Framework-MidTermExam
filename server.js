// Import libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");
const cors = require("cors");

//Initialize the express app
const app = express();

//MongoDb Atlas connection string
const mongoURI = 'mongodb+srv://kanchan:kanchan123@cluster0.t0y4q.mongodb.net/';

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error(err));

  // Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse incoming JSON requests

// Load team data from the JSON file
const teamData = JSON.parse(fs.readFileSync("./teams.json", "utf-8")); // Load teams.json

  
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
      const teams = await Team.find(); // Retrieve all teams
      res.json(teams); // Return teams as JSON
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).send("Error fetching teams");
    }
  });
  
  // API to get a team by ID
  app.get("/teams/:id", async (req, res) => {
    const teamId = req.params.id;
    try {
      const team = await Team.findOne({ teamId: teamId }); // Find team by teamId
      if (team) {
        res.json(team); // Return the team if found
      } else {
        res.status(404).send("Team not found"); // Return 404 if not found
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
      const teams = await Team.find({ city: city }); // Find teams by city
      res.json(teams); // Return teams as JSON
    } catch (error) {
      console.error("Error fetching teams by city:", error);
      res.status(500).send("Error fetching teams by city");
    }
  });
  
  // Endpoint to import team data
  app.get("/upload-teams", importTeams); // Import teams data

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});