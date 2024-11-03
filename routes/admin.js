const express = require('express');
const router = express.Router();
const { getVotingStats } = require('../controllers/adminController');

// Route to get voting statistics
router.get('/stats', getVotingStats);

module.exports = router;
