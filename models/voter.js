const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  name: String,
  voterID: { type: String, unique: true },
});

module.exports = mongoose.model('Voter', voterSchema);
