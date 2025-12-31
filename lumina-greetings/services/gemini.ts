import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

export const generateGreetingMessage = async (recipientName: string): Promise<GeneratedContent> => {
  // If no API key is present, return the perfect fallback immediately.
  // This ensures the gift works even if the API key isn't configured in the deployment.
  if (!process.env.API_KEY) {
    console.warn("API Key missing, using heartfelt fallback message.");
    return getFallbackMessage(recipientName);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Write a deeply emotional and aesthetically beautiful New Year's letter to my best girl friend.
    Her name is ${recipientName}.
    
    The core message must convey:
    1. She means the world to me.
    2. A sincere "Thank you for coming into my life".
    3. Excitement for the year ahead together.
    
    Tone: Warm, sincere, slightly poetic, deep connection, not cheesy.
    
    Format the response as a JSON object with:
    - headline: A short, elegant title (e.g., "To the One Who changed Everything", "For [Name]").
    - message: The body text (approx 80-100 words). Use newlines for spacing.
    - signoff: A warm closing (e.g., "Forever grateful,").
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            message: { type: Type.STRING },
            signoff: { type: Type.STRING },
          },
          required: ["headline", "message", "signoff"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Error generating greeting:", error);
    return getFallbackMessage(recipientName);
  }
};

function getFallbackMessage(name: string): GeneratedContent {
  return {
    headline: `For You, ${name}`,
    message: "As 2026 begins, I wanted to take a quiet moment to tell you something I don't say enough. You coming into my life has been one of my greatest blessings. \n\nYou truly mean the world to me. Through every high and every low, you've been my anchor and my joy. Thank you for being who you are. Here’s to another year of us.",
    signoff: "With all my love,"
  };
}