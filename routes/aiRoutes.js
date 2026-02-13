const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /classify route
router.post('/classify', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // Generate content based on the prompt
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        // Return the result
        res.json({ result: responseText });
    } catch (error) {
        console.error('Error in /classify route:', error);
        res.status(500).json({ error: 'Failed to generate AI response', details: error.message });
    }
});

module.exports = router;
