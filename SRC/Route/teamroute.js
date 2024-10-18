// Import the express module to create a router
const express = require("express");
const router = express.Router();

// Route to get all teams
router.get("/teams", getAllTeams);

