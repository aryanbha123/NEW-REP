import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello User! How may I help you?", sender: "bot" }
    ]);
    const [showBot, setShowBot] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getBotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();
    
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
            return (
                <div>
                    <p>Hey there! 👋 How can I assist you today?</p>
                    <ul>
                        <li>Need help? Type <b>"help"</b>.</li>
                        <li>Want to know about us? Type <b>"about us"</b>.</li>
                        <li>Looking for reports? Type <b>"reports"</b>.</li>
                    </ul>
                </div>
            );
        } else if (lowerCaseMessage.includes("help")) {
            return (
                <div>
                    <p>Sure! Here are some things I can help with:</p>
                    <ul>
                        <li>🔹 <a href="/user/events">Enroll in a Drive</a></li>
                        <li>🔹 <a href="/dashboard">Access the Dashboard</a></li>
                        <li>🔹 <a href="/donate">Make a Donation</a></li>
                        <li>🔹 <a href="/reports">View Reports</a></li>
                    </ul>
                    <p>Let me know what you need! 😊</p>
                </div>
            );
        } else if (lowerCaseMessage.includes("about us")) {
            return (
                <div>
                    <p>We are a platform dedicated to providing support and resources. Learn more about us here:</p>
                    <p>👉 <a href="/about">Visit Our About Us Page</a></p>
                </div>
            );
        } else if (lowerCaseMessage.includes("enroll in drive")) {
            return (
                <div>
                    <p>Ready to enroll? Click the link below:</p>
                    <p>🚀 <a href="/user/events">Enroll in Drive</a></p>
                </div>
            );
        } else if (lowerCaseMessage.includes("dashboard")) {
            return (
                <div>
                    <p>Access your dashboard here:</p>
                    <p>📊 <a href="/dashboard">Go to Dashboard</a></p>
                </div>
            );
        } else if (lowerCaseMessage.includes("donations")) {
            return (
                <div>
                    <p>We appreciate your generosity! Support us by donating:</p>
                    <p>❤️ <a href="/donate">Donate Now</a></p>
                </div>
            );
        } else if (lowerCaseMessage.includes("reports")) {
            return (
                <div>
                    <p>View the latest reports and updates:</p>
                    <p>📄 <a href="/reports">View Reports</a></p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>😕 Sorry, I didn’t understand that. Can you rephrase?</p>
                    <p>Try asking about:</p>
                    <ul>
                        <li>📜 <b>"about us"</b> - Learn more about our platform</li>
                        <li>📊 <b>"dashboard"</b> - Access your dashboard</li>
                        <li>💰 <b>"donations"</b> - Support us with a donation</li>
                    </ul>
                </div>
            );
        }
    };
    

    const handleSendMessage = (message) => {
        const text = message || userInput.trim();
        if (!text) return;

        const userMessage = { id: messages.length + 1, text, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setUserInput("");
        setIsTyping(true);

        setTimeout(() => {
            const botMessage = { id: messages.length + 2, text: getBotResponse(text), sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            <div onClick={() => setShowBot(!showBot)}>
                <img 
                    className="fixed h-16 w-16 rounded-full shadow-xl  right-8 bottom-14 z-40 cursor-pointer transition-all hover:scale-110"
                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
                    alt="Chatbot"
                />
            </div>

            <div className={`${showBot ? "" : "hidden"} fixed flex flex-col justify-between right-8 bottom-24 h-[600px] w-[500px] shadow-xl  rounded-2xl z-50 bg-white`}>                
                <div className="flex items-center justify-between bg-teal-600 text-white p-4 rounded-t-2xl">
                    <span className="text-lg font-semibold">Chat Support</span>
                    <button onClick={() => setShowBot(false)} className="text-lg font-bold">×</button>
                </div>

                <div className="flex-1 overflow-auto space-y-2 p-2" style={{ maxHeight: "380px" }}>
                    {messages.map((msg) => (
                        <p key={msg.id} className={`${msg.sender === "bot" ? "text-start" : "text-end"} text-xs p-3 bg-gray-50`}>
                            {/* <Chip label={msg.text} color={msg.sender === "bot" ? "primary" : "secondary"} className="max-w-xs" /> */}
                            {msg.text}
                        </p>
                    ))}
                    {isTyping && (
                        <p className="text-start text-gray-500 italic">Bot is typing...</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-2 px-2">
                    {["About Us", "Donations" , "Reports",  "Help", "Enroll in Drive"].map((option, index) => (
                        <Chip key={index} label={option} onClick={() => handleSendMessage(option)} color="default" clickable className="text-sm" />
                    ))}
                </div>

                <div className="flex gap-4 items-center justify-between w-full p-2">
                    <input
                        type="text"
                        className="flex py-2 px-4 bg-gray-200 rounded-full h-[40px] w-full outline-none"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                    />
                    <button onClick={() => handleSendMessage()} className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition-all">
                        <SendIcon />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;