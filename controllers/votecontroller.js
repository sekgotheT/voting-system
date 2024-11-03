const Vote = require('../models/Vote');

exports.submitVote = async (req, res) => {
  try {
    const { voterID, candidate } = req.body;

    const existingVote = await Vote.findOne({ voterID });
    if (existingVote) return res.status(400).json({ message: "You have already voted" });

    const vote = new Vote({ voterID, candidate });
    await vote.save();
    res.status(201).json({ message: "Vote submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Voting failed", error });
  }
};
