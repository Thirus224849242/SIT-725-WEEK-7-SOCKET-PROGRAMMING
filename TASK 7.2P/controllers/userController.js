// User Controller
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const newUser = new User({ first_name, last_name, email, password });
    await newUser.save();
    console.log("User registered successfully");
    res.json({ statusCode: 200, message: "User registered successfully! You can log In now" });
  } catch (error) {
    console.log("User registration failed", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

