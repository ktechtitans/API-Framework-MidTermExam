// Import the express module to create a router
const express = require("express");
const router = express.Router();

// Route to get all teams
router.get("/teams", getAllTeams);

// Route to get a specific team by its ID
router.get("/teams/:id", getTeamById);
