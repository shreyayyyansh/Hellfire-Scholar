const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Initialize the Gemini API client using your key from the .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Call the Gemini 2.5 Flash model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
        });

        // Send the text response back to the frontend
        res.json({ reply: response.text });

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Something went wrong with the chatbot backend." });
    }
});

module.exports = router;