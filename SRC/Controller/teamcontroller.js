// Import the Team model
const Team = require("../Model/teammodel"); 
const fs = require("fs");
const path = require("path");

// Function to get all teams
const getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find(); // Fetch all teams from the database
  
      if (teams.length > 0) {
        res.status(200).json(teams); // Respond with the list of teams
      } else {
        res.status(404).json({ error: "No teams found" }); // Handle case where no teams are found
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Error occurred while getting teams", error });
    }
  };

 // Function to get a team by its ID
const getTeamById = async (req, res) => {
  const teamID = req.params.teamId; // Correctly extract the team ID
  try {
      const team = await Team.findOne({ teamId: teamID }); // Fetch the team by ID
      if (!team) {
          return res.status(404).send("Team not found with the given ID"); // Handle case where team is not found
      } else {
          res.status(200).json(team); // Respond with the found team
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving the team"); // Handle server error
  }
};

  // Function to get teams by city
const getTeamsByCity = async (req, res) => {
    const cityRegex = new RegExp(req.params.city, "i"); // Create a case-insensitive regex for the city
    try {
      const teams = await Team.find({ city: cityRegex }); // Fetch teams matching the city regex
      if (teams.length > 0) {
        res.status(200).json(teams); // Respond with the list of matching teams
      } else {
        res.status(404).json({ message: "No teams found in the given city" }); // Handle case where no teams are found
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Failed to fetch teams by city"); // Handle server error
    }
  };

  // Export the functions to connect with router
module.exports = { getAllTeams, getTeamById, getTeamsByCity };


