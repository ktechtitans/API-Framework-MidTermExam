/**
 * File: controller.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 18-10-2024
 */
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
  const teamID = req.params.teamId; 
  try {
      const team = await Team.findOne({ teamId: teamID });
      if (!team) {
          return res.status(404).send("Team not found with the given ID"); 
      } else {
          res.status(200).json(team); 
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving the team"); 
  }
};

  // Function to get teams by city
const getTeamsByCity = async (req, res) => {
    const cityRegex = new RegExp(req.params.city, "i"); 
    try {
      const teams = await Team.find({ city: cityRegex }); 
      if (teams.length > 0) {
        res.status(200).json(teams);
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


