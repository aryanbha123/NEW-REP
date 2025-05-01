// src/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAoGoKYw9Tvtl1yC-g6Q1Me4ZSeSdAQEnM");

const context = `
You are a chatbot assistant for the Eco bloom plantation management system.
Your job is to guide users about donations, enrolling in drives, accessing reports, and more.

Key Links:
- Enroll in Drive: /user/events
- Donate: localhost:5173/ drag down there is a button
- Dashboard:  localhost:5173/dashboard
- Reports:  localhost:5173 drag down there is a button
- Feedback :  localhost:5173/feedbabck

Provide friendly, concise, and helpful responses. Always direct users to the correct link.
`;

export const getGeminiResponse = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([
       `${context}`,
        `User: ${userPrompt}`
        
      ]);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error while processing your request.";
  }
};
