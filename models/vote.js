const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterID: { type: String, unique: true },
  candidate: String,
});

module.exports = mongoose.model('Vote', voteSchema);
