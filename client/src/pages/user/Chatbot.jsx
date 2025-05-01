// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getGeminiResponse } from "./utils/GeminiRes";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello User! How may I help you?", sender: "bot" },
  ]);
  const [showBot, setShowBot] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message) => {
    const text = message || userInput.trim();
    if (!text) return;

    const userMessage = { id: messages.length + 1, text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    const response = await getGeminiResponse(text);
    const botMessage = { id: messages.length + 2, text: response, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <>
      <div onClick={() => setShowBot(!showBot)}>
        <img
          className="fixed h-16 w-16 rounded-full shadow-xl right-8 bottom-14 z-40 cursor-pointer transition-all hover:scale-110"
          src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg"
          alt="Chatbot"
        />
      </div>

      <div
        className={`${
          showBot ? "" : "hidden"
        } fixed flex flex-col justify-between right-8 bottom-24 h-[600px] w-[500px] shadow-xl rounded-2xl z-50 bg-white`}
      >
        <div className="flex items-center justify-between bg-teal-600 text-white p-4 rounded-t-2xl">
          <span className="text-lg font-semibold">Chat Support</span>
          <button onClick={() => setShowBot(false)} className="text-lg font-bold">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto space-y-2 p-2" style={{ maxHeight: "380px" }}>
          {messages.map((msg) => (
            // <p
            //   key={msg.id}
            //   className={`${
            //     msg.sender === "bot" ? "text-start" : "text-end"
            //   } text-xs p-3 bg-gray-50`}
            // >
            //   {msg.text}
            // </p>
            <div
            key={msg.id}
            className={`${msg.sender === "bot" ? "text-start" : "text-end"} text-xs p-3 bg-gray-50 rounded-md whitespace-pre-wrap`}
            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
          />
          
          ))}
          {isTyping && <p className="text-start text-gray-500 italic">Bot is typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 px-2">
          {["About Us", "Donations", "Reports", "Help", "Enroll in Drive"].map((option, index) => (
            <Chip
              key={index}
              label={option}
              onClick={() => handleSendMessage(option)}
              color="default"
              clickable
              className="text-sm"
            />
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
          <button
            onClick={() => handleSendMessage()}
            className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition-all"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;

const formatMessage = (text) => {
    // Convert markdown-like **bold** and *italic* to HTML
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />")
      .replace(/^\* (.*$)/gm, "• $1");
  
    return formatted;
  };
  