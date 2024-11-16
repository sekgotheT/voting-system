const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname))); // Serving all static files from the root directory

// Import Routes
const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/admin', adminRoutes);

// Connect to MongoDB (you can replace this with your own MongoDB URI)
mongoose.connect('mongodb://localhost/votingSystem', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Schema for Votes
const voteSchema = new mongoose.Schema({
    option: String,
    votes: { type: Number, default: 0 },
});

const Vote = mongoose.model('Vote', voteSchema);

// Route to fetch all voting options
app.get('/votes', async (req, res) => {
    const votes = await Vote.find();
    res.json(votes);
});

// Route to submit a vote
app.post('/vote', async (req, res) => {
    const { option } = req.body;

    const vote = await Vote.findOne({ option });

    if (vote) {
        vote.votes += 1;
        await vote.save();
        res.json({ message: 'Vote recorded!' });
    } else {
        const newVote = new Vote({ option, votes: 1 });
        await newVote.save();
        res.json({ message: 'New option added and vote recorded!' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
