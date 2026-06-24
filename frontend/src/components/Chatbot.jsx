import './Chatbot.css';
import React, { useState } from 'react';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Handles the pop-up toggle

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            
            const botMessage = { text: data.reply, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error connecting to chatbot:", error);
            const errorMessage = { text: "Failed to reach assistant.", sender: 'bot' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* The Floating Green Circle Icon at the top */}
            <button className="chatbot-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>

            {/* The White & Green Chat Window */}
            <div className={`chatbot-container ${isOpen ? '' : 'hidden'}`}>
                <div className="chatbot-header">
                    <span>Hellfire Assistant</span>
                </div>
                
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {loading && <div className="message bot">Thinking...</div>}
                </div>

                <form onSubmit={handleSend} className="chatbot-input-form">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Ask something..." 
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
}