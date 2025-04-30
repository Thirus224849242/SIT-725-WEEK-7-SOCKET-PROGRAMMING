// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const User = require("../models/User");
const Controller = require("../controllers/userController");

router.post('/register', async (req, res) => {
  Controller.registerUser(req,res)
    
});

router.get('/testRoute', (req, res) => {
    res.send('Test route Active');
});

module.exports = router;  // Export the router
