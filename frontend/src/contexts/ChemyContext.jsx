import React, { createContext, useContext, useState, useCallback } from "react";
import OpenAI from "openai";

const ChemyContext = createContext();

const CHEMISTRY_SYSTEM_PROMPT = `You are a Chemistry researcher who has won multiple Nobel Prizes, now teaching a highly curious university student about chemical reactions. Your goal is to provide the student with up to 10 possible chemical combinations to create an ideal material.

For each possibility, follow this strict format:

Start with a title for the reaction.

Write the chemical reaction using only chemical formulas (no compound names).

Provide a simple 2-3 sentence explanation of what happens in the reaction to form the ideal material. Use simple language to ensure the student understands.

Example format:

Possibility 1: [Reaction Title]
Reaction:
[Chemical Reaction Formula]
Explanation:
[Short explanation in simple words]

Possibility 2: [Reaction Title]
Reaction:
[Chemical Reaction Formula]
Explanation:
[Short explanation in simple words]

Do not add any extra text like introductions, conclusions, or sourcing suggestions. Follow this exact format in every response.`;

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your_api_key", //should be in .env
  dangerouslyAllowBrowser: true,
});

export const ChemyProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPossibility, setSelectedPossibility] = useState(null);
  const [possibilities, setPossibilities] = useState([]);

  const chemyLogic = useCallback(async (userInput) => {
    setIsLoading(true);
    setError(null);

    const userMessage = {
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    try {
      // Add user message to history
      setChatHistory((prev) => [...prev, userMessage]);

      // Get AI response with system prompt
      const completion = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: CHEMISTRY_SYSTEM_PROMPT,
          },
          userMessage,
        ],
        temperature: 0.7, // Slightly creative but still focused
        max_tokens: 1000, // Allows for detailed chemical reactions
      });

      const aiResponse = {
        role: "assistant",
        content: completion.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };

      // Parse the response to extract possibilities
      const parsedPossibilities = aiResponse.content
        .split("\n\n")
        .filter((section) => section.startsWith("Possibility"))
        .map((possibility) => {
          const [title, ...rest] = possibility.split("\n");
          const reactionIndex = rest.findIndex((line) =>
            line.startsWith("Reaction:")
          );
          const explanationIndex = rest.findIndex((line) =>
            line.startsWith("Explanation:")
          );

          return {
            title: title.replace("Possibility ", ""),
            reaction: rest
              .slice(reactionIndex + 1, explanationIndex)
              .join("\n")
              .trim(),
            explanation: rest
              .slice(explanationIndex + 1)
              .join("\n")
              .trim(),
          };
        });

      setPossibilities(parsedPossibilities);
      setLastResponse(aiResponse);
      setChatHistory((prev) => [...prev, aiResponse]);

      return aiResponse;
    } catch (error) {
      const errorMessage = {
        role: "system",
        content: "Sorry, there was an error processing your chemistry request.",
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      setError(errorMessage);
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setChatHistory([]);
    setLastResponse(null);
    setError(null);
  }, []);

  const value = {
    chatHistory,
    isLoading,
    lastResponse,
    error,
    chemyLogic,
    clearHistory,
    possibilities,
    selectedPossibility,
    setSelectedPossibility,
  };

  return (
    <ChemyContext.Provider value={value}>{children}</ChemyContext.Provider>
  );
};

export const useChemy = () => {
  const context = useContext(ChemyContext);
  if (!context) {
    throw new Error("useChemy must be used within a ChemyProvider");
  }
  return context;
};
