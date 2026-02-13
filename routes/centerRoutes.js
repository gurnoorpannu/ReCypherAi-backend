const express = require('express');
const router = express.Router();
const RecycleCenter = require('../models/RecycleCenter');

// GET /nearest - Find nearest recycle centers
router.get('/nearest', async (req, res) => {
    try {
        const { lat, long } = req.query;

        // Validate coordinates
        if (!lat || !long) {
            return res.status(400).json({
                error: 'Latitude and longitude are required',
                usage: '/api/centers/nearest?lat=40.7128&long=-74.0060'
            });
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude values' });
        }

        // Validate coordinate ranges
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).json({ error: 'Coordinates out of valid range' });
        }

        // Find centers within 5000 meters using $near operator
        const centers = await RecycleCenter.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], // GeoJSON uses [longitude, latitude]
                    },
                    $maxDistance: 5000, // 5000 meters (5 km)
                },
            },
        });

        res.json({
            count: centers.length,
            centers,
        });
    } catch (error) {
        console.error('Error finding nearest centers:', error);
        res.status(500).json({
            error: 'Failed to find nearest centers',
            details: error.message
        });
    }
});

module.exports = router;
