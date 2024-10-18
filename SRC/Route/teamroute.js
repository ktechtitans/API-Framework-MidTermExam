// Import the express module to create a router
const express = require("express");
const router = express.Router();

// Import functions from the teamcontroller
const { getAllTeams, getTeamById, getTeamsByCity } = require("../Controller/teamcontroller");

// Route to get all teams
router.get("/teams", getAllTeams);

// Route to get a specific team by its ID
router.get("/team/:teamId", getTeamById);  // Updated route to be consistent with frontend

// Route to get teams based on the city
router.get("/teams/city/:city", getTeamsByCity);

// Export the router for use in the main server file
module.exports = router;