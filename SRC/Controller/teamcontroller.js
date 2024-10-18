// Import the Team model
const Team = require("../Model/teammodel"); 
const fs = require("fs");
const path = require("path");

// Function to get all teams
const getAllTeams = async (req, res) => {
    try {
      const teams = await Team.find(); // Fetching all teams from the database
  
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
    const teamID = req.params.id; // Extracting the team ID from the request parameters
    try {
      const team = await Team.findOne({ teamId: teamID }); // Fetching the team by ID
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


