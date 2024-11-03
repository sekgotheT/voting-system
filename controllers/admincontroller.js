const Vote = require('../models/Vote');

exports.getVotingStats = async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: "$candidate", count: { $sum: 1 } } }
    ]);

    res.status(200).json({ votes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};
