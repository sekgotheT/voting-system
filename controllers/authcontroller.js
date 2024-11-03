const Voter = require('../models/Voter');

exports.register = async (req, res) => {
  try {
    const { name, voterID } = req.body;

    const existingVoter = await Voter.findOne({ voterID });
    if (existingVoter) return res.status(400).json({ message: "Voter already registered" });

    const voter = new Voter({ name, voterID });
    await voter.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { voterID } = req.body;
    const voter = await Voter.findOne({ voterID });

    if (!voter) return res.status(400).json({ message: "Voter not found" });

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
