require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
    try {
        console.log("Calling Gemini API...");
        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: 'hello',
        });
        console.log("Response:", response.text);
    } catch (err) {
        console.error("Error:", err);
    }
}
run();
