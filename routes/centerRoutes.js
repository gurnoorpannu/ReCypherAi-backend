const express = require('express');
const router = express.Router();
const RecycleCenter = require('../models/RecycleCenter');

// GET /nearest - Get all recycle centers
router.get('/nearest', async (req, res) => {
    try {
        // Fetch all centers from the database
        const centers = await RecycleCenter.find({});

        res.json({
            count: centers.length,
            centers: centers
        });
    } catch (error) {
        console.error('Error fetching all centers:', error);
        res.status(500).json({
            error: 'Failed to fetch recycle centers',
            details: error.message
        });
    }
});

module.exports = router;
