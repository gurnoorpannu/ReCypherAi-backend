const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /geocode - Proxy for Google Geocoding API
router.get('/geocode', async (req, res) => {
    try {
        const { address } = req.query;

        // Validate address parameter
        if (!address) {
            return res.status(400).json({
                error: 'Address parameter is required',
                usage: '/api/maps/geocode?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA'
            });
        }

        // Call Google Geocoding API using server-side API key
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: process.env.MAPS_API_KEY
            }
        });

        // Return the geocoding results
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Google Geocoding API:', error);
        res.status(500).json({
            error: 'Failed to geocode address',
            details: error.message
        });
    }
});

module.exports = router;
