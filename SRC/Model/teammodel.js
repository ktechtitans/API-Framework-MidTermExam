/**
 * File: teammodel.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 18-10-2024
 */
// Import Mongoose library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Team schema with appropriate fields
const TeamSchema = new Schema({
  teamId: { type: Number, required: true, unique: true },
  teamData: {
    teamName: { type: String, required: true },
    city: { type: String, required: true },
    founded: { type: String, required: true },
    coach: { type: String, required: true },
  },
});

// Create the Team model using the defined schema
const Team = mongoose.model("Team", TeamSchema);

// Export the Team model for use in other parts of the application
module.exports = Team;